package com.meticura.meticura.controller;

import com.meticura.meticura.dto.ProfileResponseDto;
import com.meticura.meticura.dto.ProfileUpdateRequest;
import com.meticura.meticura.service.UserProfileService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class ProfileController {

    private final UserProfileService service;

    public ProfileController(UserProfileService service) {
        this.service = service;
    }

    @GetMapping("/profile")
    public ProfileResponseDto getProfile(Authentication authentication) {
        @SuppressWarnings("unchecked")
        Map<String, Object> details = (Map<String, Object>) authentication.getDetails();
        String userId = (String) details.get("userId");
        String email = (String) details.get("email");

        return service.getProfile(userId, email);
    }

    @PutMapping("/profile")
    public ProfileResponseDto updateProfile(
            Authentication authentication,
            @RequestBody ProfileUpdateRequest req
    ) {
        @SuppressWarnings("unchecked")
        Map<String, Object> details = (Map<String, Object>) authentication.getDetails();
        String userId = (String) details.get("userId");
        String email = (String) details.get("email");

        return service.updateProfile(userId, email, req);
    }
}
