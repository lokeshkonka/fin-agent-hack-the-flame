package com.meticura.meticura.dto;

public class AdminStatsDto {
    private Long totalUsers;
    private Long totalFrozenUsers;
    private Long totalTransactionsToday;
    private Long totalFraudTransactionsToday;
    private Long totalKycPending;

    public AdminStatsDto(Long totalUsers, Long totalFrozenUsers, Long totalTransactionsToday,
                         Long totalFraudTransactionsToday, Long totalKycPending) {
        this.totalUsers = totalUsers;
        this.totalFrozenUsers = totalFrozenUsers;
        this.totalTransactionsToday = totalTransactionsToday;
        this.totalFraudTransactionsToday = totalFraudTransactionsToday;
        this.totalKycPending = totalKycPending;
    }

    public Long getTotalUsers() { return totalUsers; }
    public void setTotalUsers(Long totalUsers) { this.totalUsers = totalUsers; }

    public Long getTotalFrozenUsers() { return totalFrozenUsers; }
    public void setTotalFrozenUsers(Long totalFrozenUsers) { this.totalFrozenUsers = totalFrozenUsers; }

    public Long getTotalTransactionsToday() { return totalTransactionsToday; }
    public void setTotalTransactionsToday(Long totalTransactionsToday) { this.totalTransactionsToday = totalTransactionsToday; }

    public Long getTotalFraudTransactionsToday() { return totalFraudTransactionsToday; }
    public void setTotalFraudTransactionsToday(Long totalFraudTransactionsToday) { this.totalFraudTransactionsToday = totalFraudTransactionsToday; }

    public Long getTotalKycPending() { return totalKycPending; }
    public void setTotalKycPending(Long totalKycPending) { this.totalKycPending = totalKycPending; }
}
