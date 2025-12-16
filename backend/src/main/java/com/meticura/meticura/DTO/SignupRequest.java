package com.meticura.meticura.DTO;

public class SignupRequest {
    private String name;
    private String email;
    private String phoneNumber;
    private String address;
    private String panNumber;
    private String aadharNumber;
    
    public SignupRequest() {}
    
    public SignupRequest(String name, String email, String phoneNumber, 
                        String address, String panNumber, String aadharNumber) {
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.panNumber = panNumber;
        this.aadharNumber = aadharNumber;
    }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }
    
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    
    public String getPanNumber() { return panNumber; }
    public void setPanNumber(String panNumber) { this.panNumber = panNumber; }
    
    public String getAadharNumber() { return aadharNumber; }
    public void setAadharNumber(String aadharNumber) { this.aadharNumber = aadharNumber; }
}
