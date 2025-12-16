package com.meticura.meticura.controller;

import com.meticura.meticura.DTO.SignupRequest;
import com.meticura.meticura.DTO.UpdateUserRequest;
import com.meticura.meticura.DTO.ApiResponse;
import com.meticura.meticura.service.AuthService;
import com.meticura.meticura.config.SupabaseUserInfo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {
    "http://localhost:5173",
    "https://g3fc2ktx-8080.inc1.devtunnels.ms"
})
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    /**
     * Complete signup with KYC documents
     * Frontend sends JWT in Authorization header
     * POST /api/auth/complete-signup
     * Body: form-data with:
     *   - data: { name, email, phoneNumber, address, panNumber, aadharNumber }
     *   - aadharPdf: file
     *   - panPdf: file
     *   - profilePic: file
     */
    @PostMapping(value = "/complete-signup", consumes = "multipart/form-data")
    public ResponseEntity<ApiResponse<String>> completeSignup(
            @RequestPart("data") SignupRequest req,
            @RequestPart("aadharPdf") MultipartFile aadharPdf,
            @RequestPart("panPdf") MultipartFile panPdf,
            @RequestPart("adressprof") MultipartFile profilePic,
            Authentication auth) {

        try {
            SupabaseUserInfo userInfo = (SupabaseUserInfo) auth.getPrincipal();

            authService.completeSignup(
                userInfo.getId(),
                userInfo.getEmail() != null ? userInfo.getEmail() : req.getEmail(),
                req,
                aadharPdf,
                panPdf,
                profilePic
            );

            logger.info("Signup completed for user: {}", userInfo.getId());
            return ResponseEntity.ok(new ApiResponse<>(true, "Signup completed successfully"));

        } catch (Exception e) {
            logger.error("Signup failed", e);
            return ResponseEntity.badRequest()
                .body(new ApiResponse<>(false, "Signup failed: " + e.getMessage()));
        }
    }

    /**
     * Update user profile
     * PUT /api/auth/profile/{userId}
     * Optional: include documents to update
     */
    @PutMapping(value = "/profile/{userId}", consumes = "multipart/form-data")
    public ResponseEntity<ApiResponse<String>> updateProfile(
            @PathVariable Long userId,
            @RequestPart("data") UpdateUserRequest req,
            @RequestPart(value = "aadharPdf", required = false) MultipartFile aadharPdf,
            @RequestPart(value = "panPdf", required = false) MultipartFile panPdf,
            @RequestPart(value = "profilePic", required = false) MultipartFile profilePic,
            Authentication auth) {

        try {
            SupabaseUserInfo userInfo = (SupabaseUserInfo) auth.getPrincipal();

            // Verify user is updating their own profile
            if (!userInfo.getId().equals(String.valueOf(userId))) {
                return ResponseEntity.status(403)
                    .body(new ApiResponse<>(false, "Forbidden: Cannot update other user's profile"));
            }

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
