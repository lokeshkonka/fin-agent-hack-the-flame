package com.meticura.meticura.dto;

public class UserDetailDto {
    private String userId;
    private String accountId;
    private String name;
    private Long balance;
    private Boolean isFrozen;

    public UserDetailDto(String userId, String accountId, String name, Long balance, Boolean isFrozen) {
        this.userId = userId;
        this.accountId = accountId;
        this.name = name;
        this.balance = balance;
        this.isFrozen = isFrozen;
    }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getAccountId() { return accountId; }
    public void setAccountId(String accountId) { this.accountId = accountId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Long getBalance() { return balance; }
    public void setBalance(Long balance) { this.balance = balance; }

    public Boolean getIsFrozen() { return isFrozen; }
    public void setIsFrozen(Boolean frozen) { this.isFrozen = frozen; }
}
