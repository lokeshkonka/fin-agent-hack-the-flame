package com.meticura.meticura.dto;

import java.time.LocalDateTime;

public class TransactionResponseDto {
    private String transactionId;
    private String recipientName;
    private String recipientId;
    private Long amount;
    private String transactionType;
    private String description;
    private LocalDateTime createdAt;

    public TransactionResponseDto() {
    }

    public TransactionResponseDto(
            String transactionId,
            String recipientName,
            String recipientId,
            Long amount,
            String transactionType,
            String description,
            LocalDateTime createdAt
    ) {
        this.transactionId = transactionId;
        this.recipientName = recipientName;
        this.recipientId = recipientId;
        this.amount = amount;
        this.transactionType = transactionType;
        this.description = description;
        this.createdAt = createdAt;
    }

    // getters and setters

    public String getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }

    public String getRecipientName() {
        return recipientName;
    }

    public void setRecipientName(String recipientName) {
        this.recipientName = recipientName;
    }

    public String getRecipientId() {
        return recipientId;
    }

    public void setRecipientId(String recipientId) {
        this.recipientId = recipientId;
    }

    public Long getAmount() {
        return amount;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
    }

    public String getTransactionType() {
        return transactionType;
    }

    public void setTransactionType(String transactionType) {
        this.transactionType = transactionType;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
