package com.meticura.meticura.DTO;

import java.math.BigDecimal;
import java.util.List;

public class DashboardDto {
    private Long userId;
    private String email;
    private String name;
    private String accountNumber;
    private BigDecimal balance;
    private BigDecimal dailyTransactionLimit;
    private BigDecimal monthlyTransactionLimit;
    private BigDecimal dailyTransactionLimitRemaining;
    private BigDecimal monthlyTransactionLimitRemaining;
    private BigDecimal totalExpense;
    private BigDecimal totalIncome;
    private Boolean isFlaggedFraud;
    private List<TransactionDto> recentTransactions;

    public DashboardDto() {}

    public DashboardDto(Long userId, String email, String name, String accountNumber,
                       BigDecimal balance, BigDecimal dailyTransactionLimit,
                       BigDecimal monthlyTransactionLimit, BigDecimal dailyRemaining,
                       BigDecimal monthlyRemaining, BigDecimal totalExpense,
                       BigDecimal totalIncome, Boolean isFlaggedFraud,
                       List<TransactionDto> recentTransactions) {
        this.userId = userId;
        this.email = email;
        this.name = name;
        this.accountNumber = accountNumber;
        this.balance = balance;
        this.dailyTransactionLimit = dailyTransactionLimit;
        this.monthlyTransactionLimit = monthlyTransactionLimit;
        this.dailyTransactionLimitRemaining = dailyRemaining;
        this.monthlyTransactionLimitRemaining = monthlyRemaining;
        this.totalExpense = totalExpense;
        this.totalIncome = totalIncome;
        this.isFlaggedFraud = isFlaggedFraud;
        this.recentTransactions = recentTransactions;
    }

    // Getters and Setters
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

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

    public List<TransactionDto> getRecentTransactions() { return recentTransactions; }
    public void setRecentTransactions(List<TransactionDto> recentTransactions) { this.recentTransactions = recentTransactions; }
}
