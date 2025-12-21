package com.meticura.meticura.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class User {

    @Id
    @Column(name = "user_id", length = 50)
    private String userId;

    @Column(name = "email", unique = true, nullable = false)
    private String email;

    @Column(name = "account_id", unique = true, nullable = false, length = 20)
    private String accountId;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "address")
    private String address;

    @Enumerated(EnumType.STRING)
    @Column(name = "user_type", nullable = false)
    private UserType userType = UserType.USER;

    @Column(name = "daily_limit", nullable = false)
    private Long dailyLimit = 100000L;

    @Column(name = "monthly_limit", nullable = false)
    private Long monthlyLimit = 3000000L;

    @Column(name = "daily_spent", nullable = false)
    private Long dailySpent = 0L;

    @Column(name = "monthly_spent", nullable = false)
    private Long monthlySpent = 0L;

    @Column(name = "balance", nullable = false)
    private Long balance = 0L;

    @Column(name = "is_frozen", nullable = false)
    private Boolean isFrozen = false;  // ✅ ADD THIS

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt = LocalDateTime.now();

    @Column(name = "last_reset_date", nullable = false)
    private LocalDateTime lastResetDate = LocalDateTime.now();

    @Column(name = "is_admin", nullable = false)
    private Boolean isAdmin = false;



    // getters and setters

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getAccountId() { return accountId; }
    public void setAccountId(String accountId) { this.accountId = accountId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public UserType getUserType() { return userType; }
    public void setUserType(UserType userType) { this.userType = userType; }

    public Long getDailyLimit() { return dailyLimit; }
    public void setDailyLimit(Long dailyLimit) { this.dailyLimit = dailyLimit; }

    public Long getMonthlyLimit() { return monthlyLimit; }
    public void setMonthlyLimit(Long monthlyLimit) { this.monthlyLimit = monthlyLimit; }

    public Long getDailySpent() { return dailySpent; }
    public void setDailySpent(Long dailySpent) { this.dailySpent = dailySpent; }

    public Long getMonthlySpent() { return monthlySpent; }
    public void setMonthlySpent(Long monthlySpent) { this.monthlySpent = monthlySpent; }

    public Long getBalance() { return balance; }
    public void setBalance(Long balance) { this.balance = balance; }

    public Boolean getIsFrozen() { return isFrozen; }  // ✅ ADD THIS
    public void setIsFrozen(Boolean frozen) { this.isFrozen = frozen; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public LocalDateTime getLastResetDate() { return lastResetDate; }
    public void setLastResetDate(LocalDateTime lastResetDate) { this.lastResetDate = lastResetDate; }

    public Boolean getIsAdmin() { return isAdmin; }
    public void setIsAdmin(Boolean isAdmin) { this.isAdmin = isAdmin; }


}
