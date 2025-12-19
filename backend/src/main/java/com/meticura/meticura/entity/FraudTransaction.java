package com.meticura.meticura.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "fraud_transactions")
public class FraudTransaction {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "fraud_transaction_id")
    private String fraudTransactionId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sender_user_id", nullable = false)
    private User senderUser;

    @Column(name = "receiver_account_id", nullable = false)
    private String receiverAccountId;

    @Column(name = "amount", nullable = false)
    private Long amount;

    @Column(name = "fraud_type", nullable = false)
    private String fraudType; // "Fraud" or "Potential fraud"

    @Column(name = "fraud_reason")
    private String fraudReason;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    // getters and setters

    public String getFraudTransactionId() { return fraudTransactionId; }
    public void setFraudTransactionId(String fraudTransactionId) { this.fraudTransactionId = fraudTransactionId; }

    public User getSenderUser() { return senderUser; }
    public void setSenderUser(User senderUser) { this.senderUser = senderUser; }

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
