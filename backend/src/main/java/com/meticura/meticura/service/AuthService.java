package com.meticura.meticura.service;

import com.meticura.meticura.DTO.SignupRequest;
import com.meticura.meticura.DTO.UpdateUserRequest;
import com.meticura.meticura.entity.UserDetails;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
public class AuthService {

    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);

    private final UserService userService;
    private final StorageService storageService;

    public AuthService(UserService userService, StorageService storageService) {
        this.userService = userService;
        this.storageService = storageService;
    }

    /**
     * Complete user signup with KYC documents
     * Frontend sends: JWT token (in header), user details, documents
     */
    @Transactional
    public void completeSignup(String supabaseId, String email, SignupRequest req,
                              MultipartFile aadharPdf,
                              MultipartFile panPdf,
                              MultipartFile profilePic) {

        try {
            // 1. Get or create user
            Long userId = userService.getOrCreateUser(supabaseId, email, req.getName());
            logger.info("Processing signup for user: {}", userId);

            // 2. Upload documents to Supabase Storage
            String aadharPath = storageService.uploadFile(userId, "aadhar.pdf", aadharPdf);
            String panPath = storageService.uploadFile(userId, "pan.pdf", panPdf);
            String profilePath = storageService.uploadFile(userId, "adressprof.pdf", profilePic);

            if (aadharPath == null || panPath == null || profilePath == null) {
                throw new RuntimeException("Failed to upload one or more documents");
            }

            // 3. Create user details with file paths
            UserDetails userDetails = userService.createUserDetails(
                userId,
                req.getPhoneNumber(),
                req.getAddress(),
                req.getPanNumber(),
                req.getAadharNumber(),
                aadharPath,
                panPath,
                profilePath
            );

            // 4. Create default account
            userService.createDefaultAccount(userId);

            logger.info("Signup completed successfully for user: {}", userId);

        } catch (Exception e) {
            logger.error("Error during signup", e);
            throw new RuntimeException("Signup failed: " + e.getMessage());
        }
    }

    /**
     * Update user profile details (can include document updates)
     */
    @Transactional
    public void updateProfile(Long userId, UpdateUserRequest req,
                             MultipartFile aadharPdf,
                             MultipartFile panPdf,
                             MultipartFile profilePic) {

        try {
            // Update basic details
            userService.updateUserDetails(
                userId,
                req.getName(),
                req.getEmail(),
                req.getPhoneNumber(),
                req.getAddress(),
                req.getPanNumber(),
                req.getAadharNumber()
            );

            // Update documents if provided
            UserDetails userDetails = userService.getUserDetailsById(userId);

            if (aadharPdf != null && !aadharPdf.isEmpty()) {
                String aadharPath = storageService.uploadFile(userId, "aadhar.pdf", aadharPdf);
                userDetails.setAadharFilePath(aadharPath);
            }

            if (panPdf != null && !panPdf.isEmpty()) {
                String panPath = storageService.uploadFile(userId, "pan.pdf", panPdf);
                userDetails.setPanFilePath(panPath);
            }

            if (profilePic != null && !profilePic.isEmpty()) {
                String profilePath = storageService.uploadFile(userId, "profile.jpg", profilePic);
                userDetails.setProfilePicturePath(profilePath);
            }

            logger.info("Profile updated for user: {}", userId);

        } catch (Exception e) {
            logger.error("Error updating profile", e);
            throw new RuntimeException("Profile update failed: " + e.getMessage());
        }
    }
}
