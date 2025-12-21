package com.meticura.meticura.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final SupabaseAuthFilter supabaseAuthFilter;

    public SecurityConfig(SupabaseAuthFilter supabaseAuthFilter) {
        this.supabaseAuthFilter = supabaseAuthFilter;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .addFilterBefore(supabaseAuthFilter, UsernamePasswordAuthenticationFilter.class)
            .authorizeHttpRequests(authz -> authz
                .requestMatchers("/actuator/health").permitAll()
                .requestMatchers("/api/public/**").permitAll()
                .requestMatchers("/error").authenticated()
                .requestMatchers(HttpMethod.POST, "/auth/complete-signup").authenticated()
                .requestMatchers(HttpMethod.GET, "/api/user/**").authenticated()
                .requestMatchers(HttpMethod.PUT, "/api/user/**").authenticated()
                .requestMatchers(HttpMethod.GET, "/api/profile").authenticated()
                .requestMatchers(HttpMethod.PUT, "/api/profile").authenticated()
                .requestMatchers(HttpMethod.GET, "/admin/approve").authenticated()
                .requestMatchers(HttpMethod.GET, "/api/kyc/**").authenticated()
                .requestMatchers(HttpMethod.POST, "/api/kyc/**").authenticated()
                .requestMatchers(HttpMethod.GET, "/api/dashboard/**").authenticated()
                .requestMatchers(HttpMethod.GET, "/api/transfer/**").authenticated()
                .requestMatchers(HttpMethod.POST, "/api/transfer/**").authenticated()
                .requestMatchers(HttpMethod.GET, "/api/admin/**").authenticated()
                .requestMatchers(HttpMethod.POST, "/api/admin/**").authenticated()
                .requestMatchers("/secure/**").authenticated()
                .anyRequest().denyAll()
            );

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(Arrays.asList(
            "http://localhost:3000",
            "http://localhost:5173",
            "http://localhost:8080",
            "https://securebank-eight.vercel.app"
        ));
        config.setAllowedMethods(Arrays.asList(
            HttpMethod.GET.toString(),
            HttpMethod.POST.toString(),
            HttpMethod.PUT.toString(),
            HttpMethod.DELETE.toString(),
            HttpMethod.OPTIONS.toString()
        ));
        config.setAllowedHeaders(Arrays.asList("*"));
        config.setAllowCredentials(true);
        config.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
