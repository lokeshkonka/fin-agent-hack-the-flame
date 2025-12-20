package com.meticura.meticura.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class PredictionDetails {
    
    @JsonProperty("lstm_probability")
    private Double lstmProbability;
    
    @JsonProperty("meta_prediction")
    private Integer metaPrediction;
    
    @JsonProperty("meta_probability")
    private Double metaProbability;
    
    @JsonProperty("result")
    private String result;
    
    @JsonProperty("rf_probability")
    private Double rfProbability;
    
    @JsonProperty("xgb_probability")
    private Double xgbProbability;
    
    // Getters and Setters
    public Double getLstmProbability() { return lstmProbability; }
    public void setLstmProbability(Double lstmProbability) { this.lstmProbability = lstmProbability; }
    
    public Integer getMetaPrediction() { return metaPrediction; }
    public void setMetaPrediction(Integer metaPrediction) { this.metaPrediction = metaPrediction; }
    
    public Double getMetaProbability() { return metaProbability; }
    public void setMetaProbability(Double metaProbability) { this.metaProbability = metaProbability; }
    
    public String getResult() { return result; }
    public void setResult(String result) { this.result = result; }
    
    public Double getRfProbability() { return rfProbability; }
    public void setRfProbability(Double rfProbability) { this.rfProbability = rfProbability; }
    
    public Double getXgbProbability() { return xgbProbability; }
    public void setXgbProbability(Double xgbProbability) { this.xgbProbability = xgbProbability; }
}
