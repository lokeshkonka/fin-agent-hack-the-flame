package com.meticura.meticura.controller;

import com.meticura.meticura.dto.DashboardDto;
import com.meticura.meticura.service.DashboardService;
// import org.slf4j.Logger;
// import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    // ✅ explicit route: /api/dashboard
    @GetMapping("/dashboard")
    public DashboardDto getDashboard(Authentication authentication) {
        String email = authentication.getName();
        return dashboardService.getDashboardData(email);
    }
}
