package com.meticura.meticura.controller;

import com.meticura.meticura.DTO.DashboardDto;
import com.meticura.meticura.DTO.ApiResponse;
import com.meticura.meticura.config.SupabaseUserInfo;
import com.meticura.meticura.service.DashboardService;
import com.meticura.meticura.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class DashboardController {

    private static final Logger logger = LoggerFactory.getLogger(DashboardController.class);

    private final DashboardService dashboardService;
    private final UserRepository userRepository;

    public DashboardController(DashboardService dashboardService, UserRepository userRepository) {
        this.dashboardService = dashboardService;
        this.userRepository = userRepository;
    }

    /**
     * GET /api/user/dashboard
     * Returns complete dashboard with account details and recent transactions
     */
    @GetMapping("/dashboard")
    public ResponseEntity<ApiResponse<DashboardDto>> getDashboard(Authentication auth) {
        try {
            SupabaseUserInfo userInfo = (SupabaseUserInfo) auth.getPrincipal();

            // Get local user ID from Supabase ID
            Long userId = userRepository.findBySupabaseId(userInfo.getId())
                .map(user -> user.getId())
                .orElseThrow(() -> new RuntimeException("User not found in system"));

            // Get dashboard data
            DashboardDto dashboard = dashboardService.getUserDashboard(userId);

            logger.info("Dashboard retrieved for user: {}", userInfo.getId());

            return ResponseEntity.ok(new ApiResponse<>(
                true,
                "Dashboard retrieved successfully",
                dashboard
            ));

        } catch (Exception e) {
            logger.error("Failed to fetch dashboard", e);
            return ResponseEntity.badRequest()
                .body(new ApiResponse<>(false, "Failed to fetch dashboard: " + e.getMessage()));
        }
    }
}
