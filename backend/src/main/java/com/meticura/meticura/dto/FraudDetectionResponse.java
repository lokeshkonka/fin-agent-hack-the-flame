package com.meticura.meticura.dto;

public class FraudDetectionResponse {
    private String result;

    public FraudDetectionResponse() {}
    public FraudDetectionResponse(String result) {
        this.result = result;
    }

    public String getResult() { return result; }
    public void setResult(String result) { this.result = result; }
}
