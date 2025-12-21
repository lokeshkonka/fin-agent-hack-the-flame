package com.meticura.meticura.controller;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/secure")
public class SecureController {

    @GetMapping("/ping")
    public Map<String, Object> ping(Authentication authentication) {
        Map<String, Object> response = new HashMap<>();
        response.put("authenticated", authentication != null && authentication.isAuthenticated());
        if (authentication != null) {
            response.put("principal", authentication.getName());
        }
        return response;
    }
}
