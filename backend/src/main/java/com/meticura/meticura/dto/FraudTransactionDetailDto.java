package com.meticura.meticura.dto;

import java.time.LocalDateTime;

public class FraudTransactionDetailDto {
    private String fraudTransactionId;
    private String receiverAccountId;
    private Long amount;
    private String fraudType;
    private String fraudReason;
    private LocalDateTime createdAt;

    public FraudTransactionDetailDto(String fraudTransactionId, String receiverAccountId, Long amount,
                                      String fraudType, String fraudReason, LocalDateTime createdAt) {
        this.fraudTransactionId = fraudTransactionId;
        this.receiverAccountId = receiverAccountId;
        this.amount = amount;
        this.fraudType = fraudType;
        this.fraudReason = fraudReason;
        this.createdAt = createdAt;
    }

    public String getFraudTransactionId() { return fraudTransactionId; }
    public void setFraudTransactionId(String fraudTransactionId) { this.fraudTransactionId = fraudTransactionId; }

    public String getReceiverAccountId() { return receiverAccountId; }
    public void setReceiverAccountId(String receiverAccountId) { this.receiverAccountId = receiverAccountId; }

    public Long getAmount() { return amount; }
    public void setAmount(Long amount) { this.amount = amount; }

    public String getFraudType() { return fraudType; }
    public void setFraudType(String fraudType) { this.fraudType = fraudType; }

    public String getFraudReason() { return fraudReason; }
    public void setFraudReason(String fraudReason) { this.fraudReason = fraudReason; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
