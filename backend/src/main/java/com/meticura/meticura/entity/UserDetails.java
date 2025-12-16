package com.meticura.meticura.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "user_details")
public class UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "user_id", nullable = false)
    private Long userId;
    
    @Column(nullable = false)
    private String phoneNumber;
    
    @Column(nullable = false, length = 20)
    private String panNumber;
    
    @Column(nullable = false, length = 12)
    private String aadhaarNumber;
    
    @Column(columnDefinition = "TEXT")
    private String address;
    
    private LocalDate dateOfBirth;
    

    @Column(length = 500)
    private String aadhaarPdfPath;
    
    @Column(length = 500)
    private String panPdfPath;

    @Column(length = 500)
    private String addressProofPdfPath;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    
    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }
    
    public String getPanNumber() { return panNumber; }
    public void setPanNumber(String panNumber) { this.panNumber = panNumber; }
    
    public String getAadhaarNumber() { return aadhaarNumber; }
    public void setAadhaarNumber(String aadhaarNumber) { this.aadhaarNumber = aadhaarNumber; }
    
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    
    public LocalDate getDateOfBirth() { return dateOfBirth; }
    public void setDateOfBirth(LocalDate dateOfBirth) { this.dateOfBirth = dateOfBirth; }
    
    public String getAadhaarPdfPath() { return aadhaarPdfPath; }
    public void setAadhaarPdfPath(String aadhaarPdfPath) { this.aadhaarPdfPath = aadhaarPdfPath; }
    
    public String getPanPdfPath() { return panPdfPath; }
    public void setPanPdfPath(String panPdfPath) { this.panPdfPath = panPdfPath; }

    public String getAddressProofPdfPath() { return addressProofPdfPath; }
    public void setAddressProofPdfPath(String addressProofPdfPath) { this.addressProofPdfPath = addressProofPdfPath; }
}
