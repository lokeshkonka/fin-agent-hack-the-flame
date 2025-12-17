package com.meticura.meticura.service;

import com.meticura.meticura.dto.DashboardDto;
import com.meticura.meticura.dto.TransactionResponseDto;
import com.meticura.meticura.entity.Transaction;
import com.meticura.meticura.entity.TransactionType;
import com.meticura.meticura.entity.User;
import com.meticura.meticura.repository.TransactionRepository;
import com.meticura.meticura.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.*;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class DashboardService {

    private static final Logger logger = LoggerFactory.getLogger(DashboardService.class);

    private final UserRepository userRepository;
    private final TransactionRepository transactionRepository;

    public DashboardService(UserRepository userRepository,
                            TransactionRepository transactionRepository) {
        this.userRepository = userRepository;
        this.transactionRepository = transactionRepository;
    }

    /**
     * Main method: get dashboard of logged-in user based on email from JWT.
     */
    public DashboardDto getDashboardData(String email) {
        logger.info("Fetching dashboard data for email: {}", email);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found for email: " + email));

        resetDailyIfNeeded(user);
        resetMonthlyIfNeeded(user);

        String userId = user.getUserId();

        DashboardDto dto = new DashboardDto();
        dto.setUserId(userId);
        dto.setAccountId(user.getAccountId());
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());

        dto.setDailyLimit(user.getDailyLimit());
        dto.setDailySpent(user.getDailySpent());
        dto.setMonthlyLimit(user.getMonthlyLimit());
        dto.setMonthlySpent(user.getMonthlySpent());

        dto.setTotalMonthlySpending(calculateMonthlySpending(userId));
        dto.setAvgDailySpending(calculateAverageDailySpending(userId));
        dto.setBalance(calculateCurrentBalance(userId));

        dto.setRecentTransactions(getRecentTransactions(userId));
        dto.setDailySpendingData(getLast7DaysSpending(userId));
        dto.setIncomeVsExpenseData(getMonthlyIncomeVsExpense(userId));

        logger.info("Dashboard data prepared successfully for email: {}", email);
        return dto;
    }

    private void resetDailyIfNeeded(User user) {
        LocalDate today = LocalDate.now();
        LocalDate last = user.getLastResetDate().toLocalDate();

        if (!today.equals(last)) {
            user.setDailySpent(0L);
            user.setLastResetDate(LocalDateTime.now());
            userRepository.save(user);
        }
    }

    private void resetMonthlyIfNeeded(User user) {
        YearMonth current = YearMonth.now();
        YearMonth last = YearMonth.from(user.getLastResetDate());

        if (!current.equals(last)) {
            user.setMonthlySpent(0L);
            user.setLastResetDate(LocalDateTime.now());
            userRepository.save(user);
        }
    }

    private Long calculateCurrentBalance(String userId) {
        // you can extend this according to your business logic
        LocalDateTime monthStart = LocalDate.now().withDayOfMonth(1).atStartOfDay();
        LocalDateTime now = LocalDateTime.now();

        Long income = transactionRepository.getTotalAmountByTypeAndDateRange(
                userId, TransactionType.INCOME, monthStart, now);
        Long expense = transactionRepository.getTotalAmountByTypeAndDateRange(
                userId, TransactionType.EXPENSE, monthStart, now);

        if (income == null) income = 0L;
        if (expense == null) expense = 0L;

        return income - expense;
    }

    private Long calculateMonthlySpending(String userId) {
        LocalDateTime start = LocalDate.now().withDayOfMonth(1).atStartOfDay();
        LocalDateTime end = LocalDate.now().withDayOfMonth(LocalDate.now().lengthOfMonth())
                .atTime(LocalTime.MAX);

        Long expense = transactionRepository.getTotalAmountByTypeAndDateRange(
                userId, TransactionType.EXPENSE, start, end);
        return expense == null ? 0L : expense;
    }

    private Long calculateAverageDailySpending(String userId) {
        LocalDate today = LocalDate.now();
        LocalDateTime start = today.withDayOfMonth(1).atStartOfDay();
        LocalDateTime now = LocalDateTime.now();

        Long totalExpense = transactionRepository.getTotalAmountByTypeAndDateRange(
                userId, TransactionType.EXPENSE, start, now);
        if (totalExpense == null) totalExpense = 0L;

        int days = today.getDayOfMonth(); // days passed in current month
        if (days <= 0) return 0L;

        return totalExpense / days;
    }

    private List<TransactionResponseDto> getRecentTransactions(String userId) {
        List<Transaction> txs = transactionRepository
                .findByUserUserIdOrderByCreatedAtDesc(userId);

        return txs.stream()
                .limit(5)
                .map(t -> new TransactionResponseDto(
                        t.getTransactionId(),
                        t.getRecipientName(),
                        t.getRecipientId(),
                        t.getAmount(),
                        t.getTransactionType().name(),
                        t.getDescription(),
                        t.getCreatedAt()
                ))
                .collect(Collectors.toList());
    }

    private List<Map<String, Object>> getLast7DaysSpending(String userId) {
        List<Map<String, Object>> list = new ArrayList<>();
        LocalDate today = LocalDate.now();

        for (int i = 6; i >= 0; i--) {
            LocalDate date = today.minusDays(i);
            LocalDateTime start = date.atStartOfDay();
            LocalDateTime end = date.atTime(LocalTime.MAX);

            Long expense = transactionRepository.getTotalAmountByTypeAndDateRange(
                    userId, TransactionType.EXPENSE, start, end);
            if (expense == null) expense = 0L;

            Map<String, Object> m = new HashMap<>();
            m.put("date", date.toString());
            m.put("day", date.getDayOfWeek().toString().substring(0, 3)); // Mon, Tue, ...
            m.put("amount", expense);

            list.add(m);
        }

        return list;
    }

    private List<Map<String, Object>> getMonthlyIncomeVsExpense(String userId) {
        LocalDate today = LocalDate.now();
        LocalDateTime start = today.withDayOfMonth(1).atStartOfDay();
        LocalDateTime end = today.withDayOfMonth(today.lengthOfMonth())
                .atTime(LocalTime.MAX);

        Long income = transactionRepository.getTotalAmountByTypeAndDateRange(
                userId, TransactionType.INCOME, start, end);
        Long expense = transactionRepository.getTotalAmountByTypeAndDateRange(
                userId, TransactionType.EXPENSE, start, end);
        if (income == null) income = 0L;
        if (expense == null) expense = 0L;

        List<Map<String, Object>> list = new ArrayList<>();

        Map<String, Object> inc = new HashMap<>();
        inc.put("type", "Income");
        inc.put("amount", income);
        list.add(inc);

        Map<String, Object> exp = new HashMap<>();
        exp.put("type", "Expense");
        exp.put("amount", expense);
        list.add(exp);

        return list;
    }

    /**
     * Helper to update spending when new transaction is created.
     * Call this from your existing transaction creation flow.
     */
    public void handleNewTransaction(User user, Transaction transaction) {
        if (transaction.getTransactionType() == TransactionType.EXPENSE) {
            user.setDailySpent(user.getDailySpent() + transaction.getAmount());
            user.setMonthlySpent(user.getMonthlySpent() + transaction.getAmount());
            userRepository.save(user);
        }
    }
}
