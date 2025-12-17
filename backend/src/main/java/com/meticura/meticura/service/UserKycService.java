package com.meticura.meticura.service;

import com.meticura.meticura.dto.KycRequestDto;
import com.meticura.meticura.entity.KycStatus;
import com.meticura.meticura.entity.UserKyc;
import com.meticura.meticura.repository.UserKycRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.UUID;

@Service
public class UserKycService {

    private static final Logger logger = LoggerFactory.getLogger(UserKycService.class);

    private final UserKycRepository repo;
    private final WebClient supabaseStorageClient;

    @Value("${supabase.kyc-bucket}")
    private String bucketName;

    @Value("${supabase.url}")
    private String supabaseUrl;

    public UserKycService(UserKycRepository repo, WebClient supabaseStorageClient) {
        this.repo = repo;
        this.supabaseStorageClient = supabaseStorageClient;
    }

    public UserKyc completeSignup(String userId, String email, KycRequestDto dto,
                                  MultipartFile aadharPdf,
                                  MultipartFile panPdf,
                                  MultipartFile profilePic) throws Exception {

        String aadharUrl = uploadToSupabase(userId, "aadhaar", aadharPdf);
        String panUrl = uploadToSupabase(userId, "pan", panPdf);
        String profileUrl = uploadToSupabase(userId, "profile", profilePic);

        UserKyc kyc = repo.findById(userId).orElse(new UserKyc());
        kyc.setUserId(userId);
        kyc.setName(dto.getName());
        kyc.setEmail(email);
        kyc.setPhoneNumber(dto.getPhoneNumber());
        kyc.setAddress(dto.getAddress());
        kyc.setPanNumber(dto.getPanNumber());
        kyc.setAadharNumber(dto.getAadharNumber());
        kyc.setAadharPdfPath(aadharUrl);
        kyc.setPanPdfPath(panUrl);
        kyc.setProfilePicPath(profileUrl);
        kyc.setStatus(KycStatus.PENDING);

        return repo.save(kyc);
    }

    private String uploadToSupabase(String userId, String docType, MultipartFile file) throws Exception {
        String filename = docType + "-" + UUID.randomUUID() + ".pdf";
        String storagePath = userId + "/" + filename;

        byte[] content = file.getBytes();

        logger.info("Uploading {} to Supabase bucket={} path={}", docType, bucketName, storagePath);

        // POST /object/{bucket}/{path}
        supabaseStorageClient
            .post()
            .uri(uriBuilder -> uriBuilder
                .path("/object/{bucket}/{path}")
                .build(bucketName, storagePath))
            .contentType(MediaType.APPLICATION_OCTET_STREAM)
            .body(Mono.just(content), byte[].class)
            .retrieve()
            .bodyToMono(String.class)
            .block(); // we just need to ensure it succeeded; error will throw

        // Public URL
        String publicUrl = String.format(
            "%s/storage/v1/object/public/%s/%s",
            supabaseUrl,
            bucketName,
            storagePath
        );

        logger.info("Uploaded file URL: {}", publicUrl);
        return publicUrl;
    }

    public UserKyc getKycStatus(String userId) {
        return repo.findById(userId).orElse(null);
    }
}
