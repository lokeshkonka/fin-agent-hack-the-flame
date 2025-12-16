package com.meticura.meticura.config;

import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.jwk.source.RemoteJWKSet;
import com.nimbusds.jose.proc.JWSKeySelector;
import com.nimbusds.jose.proc.JWSVerificationKeySelector;
import com.nimbusds.jose.proc.SecurityContext;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.proc.DefaultJWTProcessor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URL;

@Service
public class SupabaseJwtService {

    private static final Logger logger = LoggerFactory.getLogger(SupabaseJwtService.class);

    @Value("${supabase.url}")
    private String supabaseUrl;

    private DefaultJWTProcessor<SecurityContext> jwtProcessor;

    public SupabaseUserInfo verifyAndParseToken(String token) throws Exception {
        if (jwtProcessor == null) {
            initJwtProcessor();
        }

        try {
            JWTClaimsSet claims = jwtProcessor.process(token, null);

            String id = claims.getSubject();
            String role = (String) claims.getClaim("user_role");
            String email = (String) claims.getClaim("email");

            logger.debug("JWT verified - id: {}, role: {}, email: {}", id, role, email);

            return new SupabaseUserInfo(id, role != null ? role : "user", email);

        } catch (Exception e) {
            logger.error("JWT verification failed: {}", e.getMessage());
            throw new RuntimeException("Invalid JWT token", e);
        }
    }

    private synchronized void initJwtProcessor() throws Exception {
        if (jwtProcessor != null) {
            return;
        }

        try {
            String jwksUrl = supabaseUrl + "/auth/v1/.well-known/jwks.json";
            logger.info("Initializing JWT processor with JWKS URL: {}", jwksUrl);

            RemoteJWKSet<SecurityContext> jwkSet = new RemoteJWKSet<>(new URL(jwksUrl));

            // Create the correct JWSKeySelector
            JWSKeySelector<SecurityContext> keySelector = 
                new JWSVerificationKeySelector<>(JWSAlgorithm.RS256, jwkSet);

            jwtProcessor = new DefaultJWTProcessor<>();
            jwtProcessor.setJWSKeySelector(keySelector);

            logger.info("JWT processor initialized successfully");

        } catch (Exception e) {
            logger.error("Failed to initialize JWT processor", e);
            throw e;
        }
    }
}
