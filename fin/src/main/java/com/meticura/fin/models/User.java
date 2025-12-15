package com.meticura.fin.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;



@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(nullable=false, unique=true)
    private String email;

    @Column(nullable=false, unique=true)
    private String userName;

    @Column(nullable=false)
    private String password;

    @Column(nullable=false)
    private Integer phoneNo;

    private String role;

    public User() {}

    public User(String name, 
        String email, 
        String userName, 
        String password, 
        Integer phoneNo, 
        String role){
            this.name = name;
            this.email = email;
            this.userName = userName;
            this.password = password;
            this.phoneNo = phoneNo;
            this.role = role;
        }

    public Long getId(){ return id; }
    public String getName(){ return name;}
    public String getUserName(){ return userName;}
    public String getPassword(){ return password;}
    public Integer getPhoneNo(){ return phoneNo;}
    public String getEmail(){ return email;}
    public String getRole(){ return role;}

    public void setName(String name){ this.name = name;}
    public void setEmail(String email){ this.email = email;}
    public void setUserName(String userName){ this.userName = userName;}
    public void setPhoneNo(Integer phoneNo){ this.phoneNo = phoneNo;}
    public void setPassword(String password){ this.password = password;}
    public void setRole(String role){ this.role = role;}

    @Override
    public String toString(){
        return "User{" +
        "id : " + id + 
        ", name : "+ name + 
        ", username : " + userName + 
        ", email : " + email + 
        ", password : " + password + 
        ", phoneNo : " + phoneNo + 
        ", role : " + role +
        "}";
    }
}
