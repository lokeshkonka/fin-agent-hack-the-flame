package com.meticura.meticura.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.LocalDate;

@Entity
@Table(name = "transactions")
public class Transaction {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String hour; // HH:MM format

    @Column(nullable = false)
    private String weekDay; // Monday, Tuesday, etc.

    @Column(nullable = false)
    private LocalDate date;

    @Column(nullable = false)
    private BigDecimal amount;

    @Column(name = "origin_account", nullable = false)
    private String originAccount; // Account number

    @Column(name = "destination_account", nullable = false)
    private String destinationAccount; // Account number

    @Column(nullable = false)
    private BigDecimal originOldBalance;

    @Column(nullable = false)
    private BigDecimal destinationOldBalance;

    @Column(nullable = false)
    private BigDecimal destinationNewBalance;

    @Column(nullable = false)
    private Boolean isFraud = false;

    private LocalDateTime createdAt = LocalDateTime.now();

    // getters/setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getHour() { return hour; }
    public void setHour(String hour) { this.hour = hour; }

    public String getWeekDay() { return weekDay; }
    public void setWeekDay(String weekDay) { this.weekDay = weekDay; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }

    public String getOriginAccount() { return originAccount; }
    public void setOriginAccount(String originAccount) { this.originAccount = originAccount; }

    public String getDestinationAccount() { return destinationAccount; }
    public void setDestinationAccount(String destinationAccount) { this.destinationAccount = destinationAccount; }

    public BigDecimal getOriginOldBalance() { return originOldBalance; }
    public void setOriginOldBalance(BigDecimal originOldBalance) { this.originOldBalance = originOldBalance; }

    public BigDecimal getDestinationOldBalance() { return destinationOldBalance; }
    public void setDestinationOldBalance(BigDecimal destinationOldBalance) { this.destinationOldBalance = destinationOldBalance; }

    public BigDecimal getDestinationNewBalance() { return destinationNewBalance; }
    public void setDestinationNewBalance(BigDecimal destinationNewBalance) { this.destinationNewBalance = destinationNewBalance; }

    public Boolean getIsFraud() { return isFraud; }
    public void setIsFraud(Boolean isFraud) { this.isFraud = isFraud; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
