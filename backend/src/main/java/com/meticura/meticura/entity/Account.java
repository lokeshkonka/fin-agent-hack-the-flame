package com.meticura.meticura.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "accounts")
public class Account {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;  // Maps to Users.id (NO FOREIGN KEY)

    @Column(nullable = false, unique = true)
    private String accountNumber; // ABC123456 format

    @Column(nullable = false)
    private BigDecimal balance = BigDecimal.ZERO;

    @Column(nullable = false)
    private BigDecimal dailyTransactionLimit;

    @Column(nullable = false)
    private BigDecimal monthlyTransactionLimit;

    @Column(nullable = false)
    private BigDecimal dailyTransactionLimitRemaining;

    @Column(nullable = false)
    private BigDecimal monthlyTransactionLimitRemaining;

    @Column(nullable = false)
    private BigDecimal totalExpense = BigDecimal.ZERO;

    @Column(nullable = false)
    private BigDecimal totalIncome = BigDecimal.ZERO;

    @Column(nullable = false)
    private Boolean isFlaggedFraud = false;

    private LocalDateTime createdAt = LocalDateTime.now();

    private LocalDateTime updatedAt = LocalDateTime.now();

    // getters/setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getAccountNumber() { return accountNumber; }
    public void setAccountNumber(String accountNumber) { this.accountNumber = accountNumber; }

    public BigDecimal getBalance() { return balance; }
    public void setBalance(BigDecimal balance) { this.balance = balance; }

    public BigDecimal getDailyTransactionLimit() { return dailyTransactionLimit; }
    public void setDailyTransactionLimit(BigDecimal dailyTransactionLimit) { this.dailyTransactionLimit = dailyTransactionLimit; }

    public BigDecimal getMonthlyTransactionLimit() { return monthlyTransactionLimit; }
    public void setMonthlyTransactionLimit(BigDecimal monthlyTransactionLimit) { this.monthlyTransactionLimit = monthlyTransactionLimit; }

    public BigDecimal getDailyTransactionLimitRemaining() { return dailyTransactionLimitRemaining; }
    public void setDailyTransactionLimitRemaining(BigDecimal dailyTransactionLimitRemaining) { this.dailyTransactionLimitRemaining = dailyTransactionLimitRemaining; }

    public BigDecimal getMonthlyTransactionLimitRemaining() { return monthlyTransactionLimitRemaining; }
    public void setMonthlyTransactionLimitRemaining(BigDecimal monthlyTransactionLimitRemaining) { this.monthlyTransactionLimitRemaining = monthlyTransactionLimitRemaining; }

    public BigDecimal getTotalExpense() { return totalExpense; }
    public void setTotalExpense(BigDecimal totalExpense) { this.totalExpense = totalExpense; }

    public BigDecimal getTotalIncome() { return totalIncome; }
    public void setTotalIncome(BigDecimal totalIncome) { this.totalIncome = totalIncome; }

    public Boolean getIsFlaggedFraud() { return isFlaggedFraud; }
    public void setIsFlaggedFraud(Boolean isFlaggedFraud) { this.isFlaggedFraud = isFlaggedFraud; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
