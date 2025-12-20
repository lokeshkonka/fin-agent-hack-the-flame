package com.meticura.meticura.service;

import com.meticura.meticura.dto.FraudDetectionRequest;
import com.meticura.meticura.dto.FraudDetectionResponse;
import com.meticura.meticura.dto.UserDetailDto;
import com.meticura.meticura.entity.*;
import com.meticura.meticura.repository.FraudTransactionRepository;
import com.meticura.meticura.repository.TransactionRepository;
import com.meticura.meticura.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import java.time.LocalDateTime;
import java.time.DayOfWeek;

@Service
public class MoneyTransferService {

    private static final Logger logger = LoggerFactory.getLogger(MoneyTransferService.class);

    private final UserRepository userRepository;
    private final TransactionRepository transactionRepository;
    private final FraudTransactionRepository fraudTransactionRepository;
    private final RestTemplate restTemplate;

    public MoneyTransferService(UserRepository userRepository,
                                TransactionRepository transactionRepository,
                                FraudTransactionRepository fraudTransactionRepository,
                                RestTemplate restTemplate) {
        this.userRepository = userRepository;
        this.transactionRepository = transactionRepository;
        this.fraudTransactionRepository = fraudTransactionRepository;
        this.restTemplate = restTemplate;
    }

    // ✅ Step 1: Check if sender is frozen
    public String checkSenderFrozen(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getIsFrozen()) {
            logger.warn("Sender account is frozen: {}", email);
            return "Sender account is frozen";
        }

        return "OK";
    }

    // ✅ Step 2: Validate receiver account and check if frozen
    public UserDetailDto validateReceiverAccount(String receiverAccountId) {
        User receiver = userRepository.findByAccountId(receiverAccountId)
                .orElseThrow(() -> new RuntimeException("Receiver account not found"));

        if (receiver.getIsFrozen()) {
            logger.warn("Receiver account is frozen: {}", receiverAccountId);
            throw new RuntimeException("Receiver account is frozen");
        }

        return new UserDetailDto(
                receiver.getUserId(),
                receiver.getAccountId(),
                receiver.getName(),
                receiver.getBalance(),
                receiver.getIsFrozen()
        );
    }

    // ✅ Step 3: Send to fraud detection service & process transaction
    public String transferMoney(String senderEmail, String receiverAccountId, Long amount) {
        logger.info("Starting money transfer from {} to {} amount: {}", senderEmail, receiverAccountId, amount);

        User sender = userRepository.findByEmail(senderEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (sender.getIsFrozen()) {
            return "Sender account is frozen";
        }

        if (sender.getBalance() < amount) {
            return "Insufficient balance";
        }

        User receiver = userRepository.findByAccountId(receiverAccountId)
                .orElseThrow(() -> new RuntimeException("Receiver not found"));

        if (receiver.getIsFrozen()) {
            return "Receiver account is frozen";
        }

        // Calculate fraud detection request
        LocalDateTime now = LocalDateTime.now();
        int hour = now.getHour();
        int weekday = now.getDayOfWeek().getValue(); // 1=Monday, 7=Sunday

        Double oldBalanceSender = (double) sender.getBalance();
        Double newBalanceSender = oldBalanceSender - amount;
        Double oldBalanceReceiver = (double) receiver.getBalance();
        Double newBalanceReceiver = oldBalanceReceiver + amount;

        FraudDetectionRequest fraudRequest = new FraudDetectionRequest(
                hour,
                weekday,
                "PAYMENT",
                amount.doubleValue(),
                oldBalanceSender,
                newBalanceSender,
                oldBalanceReceiver,
                newBalanceReceiver,
                0,
                false
        );

        // Call fraud detection service
    try {
        String url = "http://localhost:5000/api/v0/predict";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth("sk_qxKjLxTe6ReRYDv-6X6C4I6YiJbOwTp0Cga8d62KXhk");

        HttpEntity<FraudDetectionRequest> entity = new HttpEntity<>(fraudRequest, headers);

        ResponseEntity<FraudDetectionResponse> response =
                restTemplate.exchange(
                        url,
                        HttpMethod.POST,
                        entity,
                        FraudDetectionResponse.class
                );

        FraudDetectionResponse fraudResponse = response.getBody();

        logger.info("Fraud detection result: {}", 
            fraudResponse != null && fraudResponse.getPrediction() != null 
                ? fraudResponse.getPrediction().getResult() 
                : "null");

        // ✅ Check the result inside prediction object
        if (fraudResponse != null 
            && fraudResponse.getPrediction() != null 
            && "Not fraud".equalsIgnoreCase(fraudResponse.getPrediction().getResult())) {
            
            return proceedWithTransaction(sender, receiver, amount);
        } else if (fraudResponse != null && fraudResponse.getPrediction() != null) {
            
            return handleFraudDetected(
                sender, 
                receiverAccountId, 
                amount, 
                fraudResponse.getPrediction().getResult()
            );
        } else {
            return "Fraud detection service error: empty response";
        }

    } catch (Exception e) {
        logger.error("Fraud detection service error: {}", e.getMessage());
        return "Fraud detection service error: " + e.getMessage();
    }


    }

    // Helper: Proceed with transaction
    private String proceedWithTransaction(User sender, User receiver, Long amount) {
        try {
            // Create transaction for sender (expense)
            Transaction senderTransaction = new Transaction();
            senderTransaction.setUser(sender);
            senderTransaction.setRecipientName(receiver.getName());
            senderTransaction.setRecipientId(receiver.getAccountId());
            senderTransaction.setAmount(amount);
            senderTransaction.setTransactionType(TransactionType.EXPENSE);
            senderTransaction.setDescription("Money transfer to " + receiver.getName());
            transactionRepository.save(senderTransaction);

            // Create transaction for receiver (income)
            Transaction receiverTransaction = new Transaction();
            receiverTransaction.setUser(receiver);
            receiverTransaction.setRecipientName(sender.getName());
            receiverTransaction.setRecipientId(sender.getAccountId());
            receiverTransaction.setAmount(amount);
            receiverTransaction.setTransactionType(TransactionType.INCOME);
            receiverTransaction.setDescription("Money received from " + sender.getName());
            transactionRepository.save(receiverTransaction);

            // Update balances
            sender.setBalance(sender.getBalance() - amount);
            sender.setDailySpent(sender.getDailySpent() + amount);
            sender.setMonthlySpent(sender.getMonthlySpent() + amount);
            userRepository.save(sender);

            receiver.setBalance(receiver.getBalance() + amount);
            userRepository.save(receiver);

            logger.info("Transaction successful: {} -> {} amount: {}", 
                    sender.getEmail(), receiver.getAccountId(), amount);

            return "Transaction successful";
        } catch (Exception e) {
            logger.error("Transaction failed: {}", e.getMessage());
            return "Transaction failed: " + e.getMessage();
        }
    }

    // Helper: Handle fraud detected
    private String handleFraudDetected(User sender, String receiverAccountId, Long amount, String fraudType) {
        try {
            // Freeze sender account
            sender.setIsFrozen(true);
            userRepository.save(sender);

            // Log fraud transaction
            FraudTransaction fraudTx = new FraudTransaction();
            fraudTx.setSenderUser(sender);
            fraudTx.setReceiverAccountId(receiverAccountId);
            fraudTx.setAmount(amount);
            fraudTx.setFraudType(fraudType);
            fraudTx.setFraudReason("Detected by fraud detection service");
            fraudTransactionRepository.save(fraudTx);

            logger.warn("Fraud detected and account frozen for user: {}. Fraud type: {}", 
                    sender.getEmail(), fraudType);

            return "Fraud detected: Account has been frozen";
        } catch (Exception e) {
            logger.error("Error handling fraud: {}", e.getMessage());
            return "Error handling fraud: " + e.getMessage();
        }
    }
}
