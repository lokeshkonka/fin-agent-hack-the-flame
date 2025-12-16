package com.meticura.meticura.service;

import com.meticura.meticura.DTO.DashboardDto;
import com.meticura.meticura.DTO.TransactionDto;
import com.meticura.meticura.entity.User;
import com.meticura.meticura.entity.Account;
import com.meticura.meticura.entity.Transaction;
import com.meticura.meticura.repository.UserRepository;
import com.meticura.meticura.repository.AccountRepository;
import com.meticura.meticura.repository.TransactionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DashboardService {

    private static final Logger logger = LoggerFactory.getLogger(DashboardService.class);

    private final UserRepository userRepository;
    private final AccountRepository accountRepository;
    private final TransactionRepository transactionRepository;

    public DashboardService(UserRepository userRepository,
                           AccountRepository accountRepository,
                           TransactionRepository transactionRepository) {
        this.userRepository = userRepository;
        this.accountRepository = accountRepository;
        this.transactionRepository = transactionRepository;
    }

    public DashboardDto getUserDashboard(Long userId) {
        logger.debug("Fetching dashboard for user: {}", userId);

        // Fetch user
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found: " + userId));

        // Fetch account (assuming user has one primary account)
        List<Account> accounts = accountRepository.findByUserId(userId);
        if (accounts.isEmpty()) {
            throw new RuntimeException("No account found for user: " + userId);
        }
        Account account = accounts.get(0);

        // Fetch recent transactions
        List<Transaction> recentTransactions = transactionRepository
            .findRecentByAccountNumber(account.getAccountNumber());

        List<TransactionDto> transactionDtos = recentTransactions.stream()
            .map(t -> new TransactionDto(
                t.getId(),
                t.getHour(),
                t.getWeekDay(),
                t.getDate(),
                t.getAmount(),
                t.getOriginAccount(),
                t.getDestinationAccount(),
                t.getOriginOldBalance(),
                t.getDestinationOldBalance(),
                t.getDestinationNewBalance(),
                t.getIsFraud()
            ))
            .collect(Collectors.toList());

        DashboardDto dashboard = new DashboardDto(
            user.getId(),
            user.getEmail(),
            user.getName(),
            account.getAccountNumber(),
            account.getBalance(),
            account.getDailyTransactionLimit(),
            account.getMonthlyTransactionLimit(),
            account.getDailyTransactionLimitRemaining(),
            account.getMonthlyTransactionLimitRemaining(),
            account.getTotalExpense(),
            account.getTotalIncome(),
            account.getIsFlaggedFraud(),
            transactionDtos
        );

        logger.info("Dashboard fetched for user: {}", userId);
        return dashboard;
    }
}
