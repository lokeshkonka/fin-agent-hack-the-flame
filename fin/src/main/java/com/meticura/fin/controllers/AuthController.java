package com.meticura.fin.controllers;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.*;

import com.meticura.fin.models.User;
import com.meticura.fin.repositories.UserRepository;
import com.meticura.fin.DTO.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.Optional;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;



@RestController
@RequestMapping("/auth")
public class AuthController {
    
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @PostMapping("/signup")
    public ResponseEntity<ApiResponse> signup(@RequestBody User user){
        if (user.getEmail() == null || user.getPassword() == null || user.getUserName() == null){
            return ResponseEntity
            .badRequest()
            .body(new ApiResponse(false, "All fields required"));
        }

        Optional<User> existingUser = Optional.ofNullable(userRepository.findByEmail(user.getEmail()));
        if (existingUser.isPresent()){
            return ResponseEntity
            .badRequest()
            .body(new ApiResponse(false, "Email already exists"));
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        
        return ResponseEntity.ok(new ApiResponse(true, "Email registered."));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse> login(@RequestBody User loginUser){
        if (loginUser.getEmail() == null || loginUser.getPassword() == null){
            return ResponseEntity
            .badRequest()
            .body(new ApiResponse(false, "both email and password required"));
        }

        Optional<User> existingUser = Optional.ofNullable(userRepository.findByEmail(loginUser.getEmail()));

        if (loginUser.getEmail() != null && loginUser.getPassword() != null){
            
            if(existingUser.isPresent() && passwordEncoder.matches(loginUser.getPassword(), existingUser.get().getPassword())){
                User user = userRepository.findByEmail(existingUser.get().getEmail());
                String name = user.getName();
                return ResponseEntity.ok(new ApiResponse(true, "login done", name, existingUser.get().getEmail(), existingUser.get().getUserName()));
            }
        }

        else {
            return ResponseEntity
            .badRequest()
            .body(new ApiResponse(false, "invalid credentials"));
        }

        return ResponseEntity
        .badRequest()
        .body(new ApiResponse(false, "invalid login request"));
    }
}
