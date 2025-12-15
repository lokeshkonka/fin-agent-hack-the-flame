package com.meticura.meticura.DTO;

public class SignupRequest {
    private String email;
    private String phone;
    private String address;
    private String pan;
    private String aadhaar;
    private boolean approved;
    private String name;

    
    public SignupRequest(){}
    public SignupRequest(String email, String name,String phone, String address, String pan, String aadhaar, boolean approved){
        this.email = email;
        this.name = name;
        this.phone = phone;
        this.aadhaar = aadhaar;
        this.pan = pan;
        this.aadhaar = aadhaar;
        this.approved = approved;
    }

    public String getemail(){
        return email;
    }
    public void setemail(String email){
        this.email = email;
    }

    public String getname(){
        return name;
    }
    public void setname(String name){
        this.name = name;
    }

    public String getphone(){
        return phone;
    }
    public void setphone(String phone){
        this.phone = phone;
    }
    public String getaddress(){
        return address;
    }
    public void  setaddress(String address){
        this.address = address;
    }
    public String getpan(){
        return pan;
    }
    public void setpan(String pan){
        this.pan = pan;
    }
    public String getaadhaar(){
        return aadhaar;
    }
    public void setaadhaar(String aadhaar){
        this.aadhaar = aadhaar;
    }
    public boolean getapproved(){
        return approved;
    }

    public void setapproved(boolean approved){
        this.approved = approved;
    }
}
