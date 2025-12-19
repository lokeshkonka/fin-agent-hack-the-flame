package com.meticura.meticura.dto;

public class KycDetailsDto {
    private String userId;
    private String email;
    private String name;
    private String phoneNumber;
    private String address;
    private String aadharNumber;
    private String panNumber;
    private String kycStatus;
    private String aadharPdfUrl;
    private String panPdfUrl;
    private String profilePicUrl;

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getAadharNumber() { return aadharNumber; }
    public void setAadharNumber(String aadharNumber) { this.aadharNumber = aadharNumber; }

    public String getPanNumber() { return panNumber; }
    public void setPanNumber(String panNumber) { this.panNumber = panNumber; }

    public String getKycStatus() { return kycStatus; }
    public void setKycStatus(String kycStatus) { this.kycStatus = kycStatus; }

    public String getAadharPdfUrl() { return aadharPdfUrl; }
    public void setAadharPdfUrl(String aadharPdfUrl) { this.aadharPdfUrl = aadharPdfUrl; }

    public String getPanPdfUrl() { return panPdfUrl; }
    public void setPanPdfUrl(String panPdfUrl) { this.panPdfUrl = panPdfUrl; }

    public String getProfilePicUrl() { return profilePicUrl; }
    public void setProfilePicUrl(String profilePicUrl) { this.profilePicUrl = profilePicUrl; }
}
