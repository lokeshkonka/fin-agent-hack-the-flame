package com.meticura.meticura.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class FraudDetectionRequest {
    private Integer hour;
    private Integer weekday;
    private String type;
    private Double amount;
    private Double oldbalanceOrg;
    private Double newbalanceOrig;
    private Double oldbalanceDest;
    private Double newbalanceDest;
    
    @JsonProperty("isFlaggedFraud")
    private Integer isFlaggedFraud;
    
    private Boolean is_fraud;

    public FraudDetectionRequest() {}

    public FraudDetectionRequest(Integer hour, Integer weekday, String type, Double amount,
                                 Double oldbalanceOrg, Double newbalanceOrig,
                                 Double oldbalanceDest, Double newbalanceDest,
                                 Integer isFlaggedFraud, Boolean is_fraud) {
        this.hour = hour;
        this.weekday = weekday;
        this.type = type;
        this.amount = amount;
        this.oldbalanceOrg = oldbalanceOrg;
        this.newbalanceOrig = newbalanceOrig;
        this.oldbalanceDest = oldbalanceDest;
        this.newbalanceDest = newbalanceDest;
        this.isFlaggedFraud = isFlaggedFraud;
        this.is_fraud = is_fraud;
    }

    // getters and setters
    public Integer getHour() { return hour; }
    public void setHour(Integer hour) { this.hour = hour; }

    public Integer getWeekday() { return weekday; }
    public void setWeekday(Integer weekday) { this.weekday = weekday; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }

    public Double getOldbalanceOrg() { return oldbalanceOrg; }
    public void setOldbalanceOrg(Double oldbalanceOrg) { this.oldbalanceOrg = oldbalanceOrg; }

    public Double getNewbalanceOrig() { return newbalanceOrig; }
    public void setNewbalanceOrig(Double newbalanceOrig) { this.newbalanceOrig = newbalanceOrig; }

    public Double getOldbalanceDest() { return oldbalanceDest; }
    public void setOldbalanceDest(Double oldbalanceDest) { this.oldbalanceDest = oldbalanceDest; }

    public Double getNewbalanceDest() { return newbalanceDest; }
    public void setNewbalanceDest(Double newbalanceDest) { this.newbalanceDest = newbalanceDest; }

    public Integer getIsFlaggedFraud() { return isFlaggedFraud; }
    public void setIsFlaggedFraud(Integer isFlaggedFraud) { this.isFlaggedFraud = isFlaggedFraud; }

    public Boolean getIs_fraud() { return is_fraud; }
    public void setIs_fraud(Boolean is_fraud) { this.is_fraud = is_fraud; }
}
