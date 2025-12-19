package com.meticura.meticura.controller;

import com.meticura.meticura.dto.*;
import com.meticura.meticura.entity.User;
import com.meticura.meticura.repository.UserRepository;
import com.meticura.meticura.service.AdminService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private static final Logger logger = LoggerFactory.getLogger(AdminController.class);

    private final AdminService adminService;
    private final UserRepository userRepository;

    public AdminController(AdminService adminService, UserRepository userRepository) {
        this.adminService = adminService;
        this.userRepository = userRepository;
    }

    /**
     * Helper: Check if user is admin
     */
    private void checkAdmin(Authentication authentication) {
        String email = authentication.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (Boolean.FALSE.equals(user.getIsAdmin())) {
            logger.warn("Unauthorized admin access attempt by: {}", email);
            throw new RuntimeException("Access denied: admin only");
        }
    }

    /**
     * ✅ Route 1: GET /api/admin/stats
     * Returns: totalUsers, totalFrozenUsers, totalTransactionsToday, totalFraudTransactionsToday, totalKycPending
     */
    @GetMapping("/stats")
    public AdminStatsDto getStats(Authentication authentication) {
        checkAdmin(authentication);
        logger.info("Admin stats requested");
        return adminService.getAdminStats();
    }

    /**
     * ✅ Route 2: GET /api/admin/frozen-users
     * Returns: List of frozen users with userId, email, name
     */
    @GetMapping("/frozen-users")
    public List<FrozenUserDto> getFrozenUsers(Authentication authentication) {
        checkAdmin(authentication);
        logger.info("Frozen users list requested");
        return adminService.getFrozenUsers();
    }

    /**
     * ✅ Route 3: GET /api/admin/user-fraud?userId=xxx
     * Returns: User details + fraud transactions
     */
    @GetMapping("/user-fraud")
    public UserFraudDetailDto getUserFraudDetails(
            @RequestParam String userId,
            Authentication authentication) {
        checkAdmin(authentication);
        logger.info("User fraud details requested for userId: {}", userId);
        return adminService.getUserFraudDetails(userId);
    }

    /**
     * ✅ Route 4: GET /api/admin/pending-kyc
     * Returns: List of pending KYC users with userId, email, name
     */
    @GetMapping("/pending-kyc")
    public List<PendingKycUserDto> getPendingKycUsers(Authentication authentication) {
        checkAdmin(authentication);
        logger.info("Pending KYC users requested");
        return adminService.getPendingKycUsers();
    }

    /**
     * ✅ Route 5: GET /api/admin/kyc-details?email=xxx
     * Returns: Complete KYC details including document URLs from Supabase
     */
    @GetMapping("/kyc-details")
    public KycDetailsDto getKycDetails(
            @RequestParam String email,
            Authentication authentication) {
        checkAdmin(authentication);
        logger.info("KYC details requested for email: {}", email);
        return adminService.getKycDetails(email);
    }

    /**
     * ✅ Route 6: POST /api/admin/unfreeze
     * Request: { "email": "user@example.com" }
     * Returns: Success/error message
     * Action: Unfreeze user + delete all fraud transactions
     */
    @PostMapping("/unfreeze")
    public Map<String, String> unfreezeUser(
            @RequestBody UnfreezeRequest request,
            Authentication authentication) {
        checkAdmin(authentication);
        logger.info("Unfreeze request for email: {}", request.getEmail());

        String result = adminService.unfreezeUser(request.getEmail());

        Map<String, String> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", result);
        return response;
    }
}
