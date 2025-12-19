package com.meticura.meticura.controller;

import com.meticura.meticura.dto.SendMoneyRequest;
import com.meticura.meticura.dto.UserDetailDto;
import com.meticura.meticura.service.MoneyTransferService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/transfer")
public class MoneyTransferController {

    private static final Logger logger = LoggerFactory.getLogger(MoneyTransferController.class);

    private final MoneyTransferService moneyTransferService;

    public MoneyTransferController(MoneyTransferService moneyTransferService) {
        this.moneyTransferService = moneyTransferService;
    }

    /**
     * ✅ Step 1: Check if sender account is frozen
     * GET /api/transfer/check-frozen
     */
    @GetMapping("/check-frozen")
    public Map<String, String> checkSenderFrozen(Authentication authentication) {
        String email = authentication.getName();
        logger.info("Checking if sender is frozen: {}", email);

        String result = moneyTransferService.checkSenderFrozen(email);
        
        Map<String, String> response = new HashMap<>();
        response.put("status", result);
        return response;
    }

    /**
     * ✅ Step 2: Validate receiver account and check if frozen
     * GET /api/transfer/validate-receiver?accountId=ABC123456
     */
    @GetMapping("/validate-receiver")
    public UserDetailDto validateReceiver(@RequestParam String accountId) {
        logger.info("Validating receiver account: {}", accountId);
        return moneyTransferService.validateReceiverAccount(accountId);
    }

    /**
     * ✅ Step 3: Send money with fraud detection
     * POST /api/transfer/send
     * Body: { "receiverAccountId": "ABC123456", "amount": 1500 }
     */
    @PostMapping("/send")
    public Map<String, String> sendMoney(
            @RequestBody SendMoneyRequest request,
            Authentication authentication) {

        String email = authentication.getName();
        String receiverAccountId = request.getReceiverAccountId();
        Long amount = request.getAmount();

        logger.info("Send money request from {} to {} amount: {}", 
                email, receiverAccountId, amount);

        String result = moneyTransferService.transferMoney(email, receiverAccountId, amount);

        Map<String, String> response = new HashMap<>();
        if (result.equals("Transaction successful")) {
            response.put("status", "success");
            response.put("message", result);
        } else {
            response.put("status", "error");
            response.put("message", result);
        }

        return response;
    }
}
