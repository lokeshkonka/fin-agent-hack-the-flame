package com.meticura.meticura.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Base64;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@Component
public class SupabaseAuthFilter extends OncePerRequestFilter {
    private static final Logger logger = LoggerFactory.getLogger(SupabaseAuthFilter.class);
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                   FilterChain filterChain) throws ServletException, IOException {
        String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);

            try {
                // Split JWT into parts
                String[] parts = token.split("\\.");
                if (parts.length != 3) {
                    throw new RuntimeException("Invalid JWT format");
                }

                // Decode payload (no signature verification for now, just extraction)
                String payload = new String(Base64.getUrlDecoder().decode(parts[1]));
                
                @SuppressWarnings("unchecked")
                Map<String, Object> claims = objectMapper.readValue(payload, Map.class);

                String userId = (String) claims.get("sub");
                String email = (String) claims.get("email");
                String role = (String) claims.get("role");

                logger.debug("✅ Token extracted. User: {} ({})", email, userId);

                if (userId == null || email == null) {
                    logger.warn("⚠️ Missing sub or email claim");
                    SecurityContextHolder.clearContext();
                } else {
                    Map<String, Object> details = new HashMap<>();
                    details.put("userId", userId);
                    details.put("email", email);
                    details.put("role", role);

                    UsernamePasswordAuthenticationToken auth =
                        new UsernamePasswordAuthenticationToken(
                            email, null, Collections.emptyList()
                        );
                    auth.setDetails(details);
                    SecurityContextHolder.getContext().setAuthentication(auth);
                }

            } catch (Exception e) {
                logger.warn("⚠️ Token processing failed: {}", e.getMessage());
                SecurityContextHolder.clearContext();
            }
        }

        filterChain.doFilter(request, response);
    }


    
}
