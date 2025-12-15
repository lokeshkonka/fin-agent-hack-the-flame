package com.meticura.fin.DTO;

public class ApiResponse {
    private boolean success;
    private String message;
    private String name;
    private String email;
    private String userName;

    public ApiResponse(){}
    
    public ApiResponse(boolean success, String message){
        this.success = success;
        this.message = message;
    }

    public ApiResponse(boolean success, String message, String name, String email, String userName){
        this.success = success;
        this.message = message;
        this.name = name;
        this.email = email;
        this.userName = userName;
        
    }

    public boolean getSuccess(){ return success;}
    public String getMessage(){ return message;}
    public String getName(){ return name;}
    public String getEmail(){ return email;}
    public String getUserName(){ return userName;}

    public void setSuccess(boolean success){ this.success = success; }
    public void setMessage(String message){ this.message = message;}
    public void setName(String name){ this.name = name;}
    public void setEmail(String email){ this.email = email;}
    public void setUserName(String userName){ this.userName = userName;}

}
