package com.meticura.meticura.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class FraudDetectionResponse {
    
    @JsonProperty("prediction")
    private PredictionDetails prediction;
    
    @JsonProperty("status")
    private String status;
    
    @JsonProperty("timestamp")
    private String timestamp;
    
    // Getters and Setters
    public PredictionDetails getPrediction() { return prediction; }
    public void setPrediction(PredictionDetails prediction) { this.prediction = prediction; }
    
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    
    public String getTimestamp() { return timestamp; }
    public void setTimestamp(String timestamp) { this.timestamp = timestamp; }
}
