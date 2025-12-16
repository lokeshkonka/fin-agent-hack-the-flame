package com.meticura.meticura.DTO;

import java.math.BigDecimal;
import java.time.LocalDate;

public class TransactionDto {
    private Long id;
    private String hour;
    private String weekDay;
    private LocalDate date;
    private BigDecimal amount;
    private String originAccount;
    private String destinationAccount;
    private BigDecimal originOldBalance;
    private BigDecimal destinationOldBalance;
    private BigDecimal destinationNewBalance;
    private Boolean isFraud;

    public TransactionDto() {}

    public TransactionDto(Long id, String hour, String weekDay, LocalDate date,
                         BigDecimal amount, String originAccount, String destinationAccount,
                         BigDecimal originOldBalance, BigDecimal destinationOldBalance,
                         BigDecimal destinationNewBalance, Boolean isFraud) {
        this.id = id;
        this.hour = hour;
        this.weekDay = weekDay;
        this.date = date;
        this.amount = amount;
        this.originAccount = originAccount;
        this.destinationAccount = destinationAccount;
        this.originOldBalance = originOldBalance;
        this.destinationOldBalance = destinationOldBalance;
        this.destinationNewBalance = destinationNewBalance;
        this.isFraud = isFraud;
    }

    // Getters and Setters
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
}
