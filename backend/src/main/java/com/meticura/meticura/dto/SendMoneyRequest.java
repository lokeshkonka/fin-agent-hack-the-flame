package com.meticura.meticura.dto;

public class SendMoneyRequest {
    private String receiverAccountId;
    private Long amount;

    public String getReceiverAccountId() { return receiverAccountId; }
    public void setReceiverAccountId(String receiverAccountId) { this.receiverAccountId = receiverAccountId; }

    public Long getAmount() { return amount; }
    public void setAmount(Long amount) { this.amount = amount; }
}
