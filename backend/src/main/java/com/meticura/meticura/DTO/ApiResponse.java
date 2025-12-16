package com.meticura.meticura.DTO;

public class ApiResponse {
    private boolean success;
    private String message;
    // private String data;

    public ApiResponse(){}

    public ApiResponse(boolean success, String message){
        this.success = success;
        this.message = message;
    }

    public boolean getSuccess(){ return success;}
    public String getMessage(){ return message;}

    public void setSucess(boolean success){ this.success = success;}
    public void setMessage(String message){ this.message = message;}
}
