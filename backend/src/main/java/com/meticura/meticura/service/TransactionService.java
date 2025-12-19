package com.meticura.meticura.service;

import com.meticura.meticura.entity.Transaction;
import com.meticura.meticura.entity.TransactionType;
import com.meticura.meticura.entity.User;
import com.meticura.meticura.repository.TransactionRepository;
import com.meticura.meticura.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class TransactionService {

    private static final Logger logger = LoggerFactory.getLogger(TransactionService.class);

    private final TransactionRepository transactionRepository;
    private final UserRepository userRepository;
    private final DashboardService dashboardService;

    public TransactionService(TransactionRepository transactionRepository,
                              UserRepository userRepository,
                              DashboardService dashboardService) {
        this.transactionRepository = transactionRepository;
        this.userRepository = userRepository;
        this.dashboardService = dashboardService;
    }

    /**
     * Create transaction and update user balance
     */
    public Transaction createTransaction(String userId,
                                          String recipientName,
                                          String recipientId,
                                          Long amount,
                                          TransactionType type,
                                          String description) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Create transaction
        Transaction transaction = new Transaction();
        transaction.setUser(user);
        transaction.setRecipientName(recipientName);
        transaction.setRecipientId(recipientId);
        transaction.setAmount(amount);
        transaction.setTransactionType(type);
        transaction.setDescription(description);

        transactionRepository.save(transaction);
        logger.info("Transaction created: {} {} for user {}", type, amount, userId);

        // ✅ UPDATE BALANCE AFTER TRANSACTION
        dashboardService.updateUserBalance(userId, amount, type);

        return transaction;
    }
}
