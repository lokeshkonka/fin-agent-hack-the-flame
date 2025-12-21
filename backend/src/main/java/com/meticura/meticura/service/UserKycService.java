package com.meticura.meticura.service;

import com.meticura.meticura.dto.KycRequestDto;
import com.meticura.meticura.entity.KycStatus;
import com.meticura.meticura.entity.User;
import com.meticura.meticura.entity.UserKyc;
import com.meticura.meticura.entity.UserType;
import com.meticura.meticura.repository.UserKycRepository;
import com.meticura.meticura.repository.UserRepository;
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
    private final UserRepository userRepository;
    private final WebClient supabaseStorageClient;

    @Value("${supabase.kyc-bucket}")
    private String bucketName;

    @Value("${supabase.url}")
    private String supabaseUrl;

    public UserKycService(
            UserKycRepository repo,
            UserRepository userRepository,
            WebClient supabaseStorageClient
    ) {
        this.repo = repo;
        this.userRepository = userRepository;
        this.supabaseStorageClient = supabaseStorageClient;
    }

    public UserKyc completeSignup(
            String userId,
            String email,
            KycRequestDto dto,
            MultipartFile aadharPdf,
            MultipartFile panPdf,
            MultipartFile profilePic
    ) throws Exception {

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

        UserKyc savedKyc = repo.save(kyc);
        logger.info("UserKyc saved for userId: {}", userId);

        // === USER ENTITY CREATION (email-based) ===
        User user = userRepository.findById(userId).orElse(new User());
        user.setUserId(userId);
        user.setEmail(email);
        user.setName(dto.getName());
        user.setPhoneNumber(dto.getPhoneNumber());
        user.setAddress(dto.getAddress());
        user.setUserType(UserType.USER); // default
        user.setDailyLimit(100000L);
        user.setMonthlyLimit(3000000L);
        user.setDailySpent(0L);
        user.setMonthlySpent(0L);

        if (user.getAccountId() == null) {
            user.setAccountId(generateAccountId());
        }

        userRepository.save(user);
        logger.info("User saved with email: {}, accountId: {}", email, user.getAccountId());

        return savedKyc;
    }

    private String generateAccountId() {
        String letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        String digits = "0123456789";
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 3; i++) {
            sb.append(letters.charAt((int) (Math.random() * letters.length())));
        }
        for (int i = 0; i < 6; i++) {
            sb.append(digits.charAt((int) (Math.random() * digits.length())));
        }
        return sb.toString();
    }

    private String uploadToSupabase(String userId, String docType, MultipartFile file) throws Exception {
        String filename = docType + "-" + UUID.randomUUID() + ".pdf";
        String storagePath = userId + "/" + filename;
        byte[] content = file.getBytes();

        supabaseStorageClient
                .post()
                .uri(uriBuilder -> uriBuilder
                        .path("/object/{bucket}/{path}")
                        .build(bucketName, storagePath))
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(Mono.just(content), byte[].class)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        return String.format(
                "%s/storage/v1/object/public/%s/%s",
                supabaseUrl,
                bucketName,
                storagePath
        );
    }
}
