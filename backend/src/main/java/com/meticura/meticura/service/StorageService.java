package com.meticura.meticura.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.io.IOException;

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

    /**
     * Upload file to Supabase Storage
     * @param userId User ID
     * @param fileName Logical file name (e.g., "aadhar.pdf")
     * @param file MultipartFile
     * @return Path to uploaded file or null if upload fails
     */
    public String uploadFile(Long userId, String fileName, MultipartFile file) {
        if (file == null || file.isEmpty()) {
            logger.warn("File is empty: {}", fileName);
            return null;
        }

        try {
            String path = userId + "/" + fileName;
            String uploadUrl = supabaseUrl + "/storage/v1/object/" + kycBucket + "/" + path;

            byte[] fileBytes = file.getBytes();

            webClient.post()
                .uri(uploadUrl)
                .header("Authorization", "Bearer " + serviceRoleKey)
                .header("apikey", serviceRoleKey)
                .contentType(MediaType.parseMediaType(file.getContentType() != null ? 
                    file.getContentType() : "application/octet-stream"))
                .bodyValue(fileBytes)
                .retrieve()
                .toBodilessEntity()
                .block();

            logger.info("File uploaded successfully: {}", path);
            return path;

        } catch (IOException e) {
            logger.error("Failed to upload file: {}", fileName, e);
            return null;
        } catch (Exception e) {
            logger.error("Error during file upload: {}", fileName, e);
            return null;
        }
    }

    /**
     * Get public URL for uploaded file
     */
    public String getPublicUrl(String filePath) {
        return supabaseUrl + "/storage/v1/object/public/" + kycBucket + "/" + filePath;
    }
}
