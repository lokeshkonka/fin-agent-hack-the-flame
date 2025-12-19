package com.meticura.meticura.dto;

import java.util.List;

public class UserFraudDetailDto {
    private String userId;
    private String email;
    private String name;
    private Long balance;
    private Boolean isFrozen;
    private List<FraudTransactionDetailDto> fraudTransactions;

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Long getBalance() { return balance; }
    public void setBalance(Long balance) { this.balance = balance; }

    public Boolean getIsFrozen() { return isFrozen; }
    public void setIsFrozen(Boolean frozen) { this.isFrozen = frozen; }

    public List<FraudTransactionDetailDto> getFraudTransactions() { return fraudTransactions; }
    public void setFraudTransactions(List<FraudTransactionDetailDto> fraudTransactions) { this.fraudTransactions = fraudTransactions; }
}
