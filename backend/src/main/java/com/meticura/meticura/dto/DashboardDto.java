package com.meticura.meticura.dto;

import java.util.List;
import java.util.Map;

public class DashboardDto {

    private String userId;
    private String accountId;
    private String name;
    private String email;
    private Long balance;
    private Long dailyLimit;
    private Long dailySpent;
    private Long monthlyLimit;
    private Long monthlySpent;
    private Long avgDailySpending;
    private Long totalMonthlySpending;
    private List<TransactionResponseDto> recentTransactions;
    private List<Map<String, Object>> dailySpendingData;
    private List<Map<String, Object>> incomeVsExpenseData;

    // getters and setters

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getAccountId() {
        return accountId;
    }

    public void setAccountId(String accountId) {
        this.accountId = accountId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getBalance() {
        return balance;
    }

    public void setBalance(Long balance) {
        this.balance = balance;
    }

    public Long getDailyLimit() {
        return dailyLimit;
    }

    public void setDailyLimit(Long dailyLimit) {
        this.dailyLimit = dailyLimit;
    }

    public Long getDailySpent() {
        return dailySpent;
    }

    public void setDailySpent(Long dailySpent) {
        this.dailySpent = dailySpent;
    }

    public Long getMonthlyLimit() {
        return monthlyLimit;
    }

    public void setMonthlyLimit(Long monthlyLimit) {
        this.monthlyLimit = monthlyLimit;
    }

    public Long getMonthlySpent() {
        return monthlySpent;
    }

    public void setMonthlySpent(Long monthlySpent) {
        this.monthlySpent = monthlySpent;
    }

    public Long getAvgDailySpending() {
        return avgDailySpending;
    }

    public void setAvgDailySpending(Long avgDailySpending) {
        this.avgDailySpending = avgDailySpending;
    }

    public Long getTotalMonthlySpending() {
        return totalMonthlySpending;
    }

    public void setTotalMonthlySpending(Long totalMonthlySpending) {
        this.totalMonthlySpending = totalMonthlySpending;
    }

    public List<TransactionResponseDto> getRecentTransactions() {
        return recentTransactions;
    }

    public void setRecentTransactions(List<TransactionResponseDto> recentTransactions) {
        this.recentTransactions = recentTransactions;
    }

    public List<Map<String, Object>> getDailySpendingData() {
        return dailySpendingData;
    }

    public void setDailySpendingData(List<Map<String, Object>> dailySpendingData) {
        this.dailySpendingData = dailySpendingData;
    }

    public List<Map<String, Object>> getIncomeVsExpenseData() {
        return incomeVsExpenseData;
    }

    public void setIncomeVsExpenseData(List<Map<String, Object>> incomeVsExpenseData) {
        this.incomeVsExpenseData = incomeVsExpenseData;
    }
}
