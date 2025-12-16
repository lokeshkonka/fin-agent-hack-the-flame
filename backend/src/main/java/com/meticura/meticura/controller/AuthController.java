package com.meticura.meticura.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.meticura.meticura.DTO.ApiResponse;
import com.meticura.meticura.DTO.SignupRequest;
import com.meticura.meticura.DTO.UpdateUserRequest;
import com.meticura.meticura.config.SupabaseJwtService;
import com.meticura.meticura.service.AuthService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {
    "http://localhost:5173",
    "http://localhost:3000",
    "https://g3fc2ktx-8080.inc1.devtunnels.ms"
})
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);
    private final AuthService authService;
    private final SupabaseJwtService jwtService;

    public AuthController(AuthService authService, SupabaseJwtService jwtService) {
        this.authService = authService;
        this.jwtService = jwtService;
    }

    /**
     * POST /api/auth/complete-signup
     */
    @PostMapping(value = "/complete-signup")
    public ResponseEntity<ApiResponse<String>> completeSignup(
        @RequestParam("data") String dataJson,
        @RequestParam("aadharPdf") MultipartFile aadharPdf,
        @RequestParam("panPdf") MultipartFile panPdf,
        @RequestParam("profilePic") MultipartFile profilePic,
        @RequestHeader(value = "Authorization", required = false) String authHeader) {

        try {
            logger.info("Signup request received");
            
            // Parse JSON data
            com.fasterxml.jackson.databind.ObjectMapper mapper = new com.fasterxml.jackson.databind.ObjectMapper();
            SignupRequest req = mapper.readValue(dataJson, SignupRequest.class);

            String userId = "test-user-" + System.currentTimeMillis();
            String email = req.getEmail();

            logger.info("Processing signup for: {}", email);

            // Call auth service
            authService.completeSignup(
                userId,
                email,
                req,
                aadharPdf,
                panPdf,
                profilePic
            );

            logger.info("Signup completed for user: {}", userId);
            return ResponseEntity.ok(new ApiResponse<>(true, "Signup completed successfully"));

        } catch (Exception e) {
            logger.error("Signup failed", e);
            return ResponseEntity.badRequest()
                .body(new ApiResponse<>(false, "Signup failed: " + e.getMessage()));
        }
    }

    @PutMapping(value = "/profile/{userId}")
    public ResponseEntity<ApiResponse<String>> updateProfile(
            @PathVariable Long userId,
            @RequestParam("data") String dataJson,
            @RequestParam(value = "aadharPdf", required = false) MultipartFile aadharPdf,
            @RequestParam(value = "panPdf", required = false) MultipartFile panPdf,
            @RequestParam(value = "profilePic", required = false) MultipartFile profilePic,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {

        try {
            com.fasterxml.jackson.databind.ObjectMapper mapper = new com.fasterxml.jackson.databind.ObjectMapper();
            UpdateUserRequest req = mapper.readValue(dataJson, UpdateUserRequest.class);

            authService.updateProfile(userId, req, aadharPdf, panPdf, profilePic);

            logger.info("Profile updated for user: {}", userId);
            return ResponseEntity.ok(new ApiResponse<>(true, "Profile updated successfully"));

        } catch (Exception e) {
            logger.error("Profile update failed", e);
            return ResponseEntity.badRequest()
                .body(new ApiResponse<>(false, "Update failed: " + e.getMessage()));
        }
    }
}
