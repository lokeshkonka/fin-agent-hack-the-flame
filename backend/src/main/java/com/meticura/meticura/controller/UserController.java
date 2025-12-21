package com.meticura.meticura.controller;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @GetMapping("/me")
    public Map<String, Object> getCurrentUser(Authentication authentication) {
        @SuppressWarnings("unchecked")
        Map<String, Object> details = (Map<String, Object>) authentication.getDetails();

        Map<String, Object> response = new HashMap<>();
        response.put("userId", details.get("userId"));
        response.put("email", details.get("email"));
        response.put("role", details.get("role"));
        response.put("authenticated", authentication.isAuthenticated());
        return response;
    }
}
