package com.meticura.meticura.config;

import com.nimbusds.jwt.JWT;
import com.nimbusds.jwt.JWTParser;
import com.nimbusds.jwt.JWTClaimsSet;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class SupabaseJwtService {

    private static final Logger logger = LoggerFactory.getLogger(SupabaseJwtService.class);

    @Value("${supabase.url}")
    private String supabaseUrl;

    public SupabaseUserInfo verifyAndParseToken(String token) throws Exception {
        try {
            // Parse JWT without verification (for development)
            JWT jwt = JWTParser.parse(token);
            JWTClaimsSet claims = jwt.getJWTClaimsSet();

            String id = claims.getSubject();
            String role = (String) claims.getClaim("user_role");
            String email = (String) claims.getClaim("email");

            logger.debug("JWT parsed - id: {}, role: {}, email: {}", id, role, email);

            return new SupabaseUserInfo(id, role != null ? role : "user", email);

        } catch (Exception e) {
            logger.error("JWT parsing failed: {}", e.getMessage());
            throw new RuntimeException("Invalid JWT token", e);
        }
    }
}
