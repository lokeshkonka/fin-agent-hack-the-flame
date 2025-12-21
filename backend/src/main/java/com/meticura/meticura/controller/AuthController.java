package com.meticura.meticura.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.meticura.meticura.dto.KycRequestDto;
import com.meticura.meticura.entity.UserKyc;
import com.meticura.meticura.service.UserKycService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserKycService kycService;
    private final ObjectMapper objectMapper;

    public AuthController(UserKycService kycService, ObjectMapper objectMapper) {
        this.kycService = kycService;
        this.objectMapper = objectMapper;
    }

    @PostMapping("/complete-signup")
    public Map<String, Object> completeSignup(
            Authentication authentication,
            @RequestPart("data") String jsonData,
            @RequestPart("aadharPdf") MultipartFile aadharPdf,
            @RequestPart("panPdf") MultipartFile panPdf,
            @RequestPart("profilePic") MultipartFile profilePic
    ) throws Exception {

        @SuppressWarnings("unchecked")
        Map<String, Object> details = (Map<String, Object>) authentication.getDetails();
        String userId = (String) details.get("userId");
        String email = (String) details.get("email");

        KycRequestDto dto = objectMapper.readValue(jsonData, KycRequestDto.class);
        dto.setEmail(email);

        UserKyc saved = kycService.completeSignup(userId, email, dto, aadharPdf, panPdf, profilePic);

        Map<String, Object> response = new HashMap<>();
        response.put("status", "ok");
        response.put("userId", saved.getUserId());
        response.put("kycStatus", saved.getStatus().name());
        return response;
    }
}
