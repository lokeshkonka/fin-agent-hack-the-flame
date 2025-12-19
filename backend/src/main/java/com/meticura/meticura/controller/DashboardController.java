package com.meticura.meticura.controller;

import com.meticura.meticura.dto.DashboardDto;
import com.meticura.meticura.entity.KycStatus;
import com.meticura.meticura.entity.UserKyc;
import com.meticura.meticura.service.DashboardService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import com.meticura.meticura.entity.User;
import com.meticura.meticura.repository.UserRepository;
import com.meticura.meticura.repository.UserKycRepository;

@RestController
@RequestMapping("/api")
public class DashboardController {

    private final DashboardService dashboardService;
    private final UserRepository userRepository;
    private final UserKycRepository userKycRepository;

    private static final Logger logger = LoggerFactory.getLogger(AdminController.class);

    public DashboardController(DashboardService dashboardService, UserRepository userRepository ,UserKycRepository userKycRepository) {
        this.dashboardService = dashboardService;
        this.userRepository = userRepository;
        this.userKycRepository = userKycRepository;
    }

    // ✅ explicit route: /api/dashboard
    @GetMapping("/dashboard")
    public DashboardDto getDashboard(Authentication authentication) {
        String email = authentication.getName();
        
        // Check KYC status
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        UserKyc kyc = userKycRepository.findById(user.getUserId()).orElse(null);

        if (kyc == null || kyc.getStatus() == KycStatus.PENDING) {
            logger.warn("Dashboard access denied - pending KYC for: {}", email);
            throw new RuntimeException("KYC pending. Complete KYC to access dashboard.");
        }

        return dashboardService.getDashboardData(email);
    }


}
