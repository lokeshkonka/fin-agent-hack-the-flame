package com.meticura.meticura.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class StorageService {

    private static final Logger logger = LoggerFactory.getLogger(StorageService.class);

    private final WebClient webClient;

    @Value("${supabase.url}")
    private String supabaseUrl;

    @Value("${supabase.service-role-key}")
    private String serviceRoleKey;

    @Value("${supabase.kyc-bucket}")
    private String kycBucket;

    public StorageService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.build();
    }

    public String uploadFile(Long userId, String fileName, MultipartFile file) {
        if (file == null || file.isEmpty()) {
            logger.error("File '{}' is null or empty for user {}", fileName, userId);
            return null;
        }

        try {
            String path = userId + "/" + fileName;
            String uploadUrl = supabaseUrl + "/storage/v1/object/" + kycBucket + "/" + path;

            logger.info("Uploading '{}' for user {} to {}", fileName, userId, uploadUrl);

            byte[] fileBytes = file.getBytes();

            webClient.post()
                .uri(uploadUrl)
                .header("Authorization", "Bearer " + serviceRoleKey)
                .header("apikey", serviceRoleKey)
                .contentType(MediaType.parseMediaType(
                    file.getContentType() != null ? file.getContentType() : "application/octet-stream"
                ))
                .bodyValue(fileBytes)
                .retrieve()
                .toBodilessEntity()
                .block();

            logger.info("File '{}' uploaded successfully to {}", fileName, path);
            return path;

        } catch (Exception e) {
            logger.error("Failed to upload file '{}' for user {}: {}", fileName, userId, e.getMessage(), e);
            return null;
        }
    }
}
