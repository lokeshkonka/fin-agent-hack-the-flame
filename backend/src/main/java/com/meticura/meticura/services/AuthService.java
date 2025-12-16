package com.meticura.meticura.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.client.WebClient;

import com.meticura.meticura.DTO.SignupRequest;
import com.meticura.meticura.DTO.UpdateUserRequest;
import com.meticura.meticura.entity.User;
import com.meticura.meticura.entity.UserDetails;
import com.meticura.meticura.reposiratory.UserDetailsRepository;
import com.meticura.meticura.reposiratory.UserRepository;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final UserDetailsRepository userDetailsRepository;
    private final WebClient webClient;

    @Value("${supabase.url}")
    private String supabaseUrl;

    @Value("${supabase.service-role-key}")
    private String serviceRoleKey;

    @Value("${supabase.kyc-bucket}")
    private String kycBucket;

    public AuthService(UserRepository userRepository,
                       UserDetailsRepository userDetailsRepository,
                       WebClient.Builder webClientBuilder) {
        this.userRepository = userRepository;
        this.userDetailsRepository = userDetailsRepository;
        this.webClient = webClientBuilder.build();
    }

    @Transactional
    public void signup(SignupRequest req,
                       MultipartFile aadhaarPdf,
                       MultipartFile panPdf,
                       MultipartFile addprofPdf) {

        // 1) Save basic user
        User user = new User();
        user.setName(req.getname());
        user.setEmail(req.getemail());
        user.setApproved(req.getapproved());
        user.setFrozen(false);
        User saved = userRepository.save(user);

        // 2) Upload documents to Supabase Storage
        String aadhaarPath = uploadToStorage(saved.getId(), "aadhaar.pdf", aadhaarPdf);
        String panPath = uploadToStorage(saved.getId(), "pan.pdf", panPdf);
        String addrPath = uploadToStorage(saved.getId(), "address-proof.pdf", addprofPdf);

        // 3) Save user details with paths
        UserDetails details = new UserDetails();
        details.setUserId(saved.getId());
        details.setPhoneNumber(req.getphone());
        details.setAddress(req.getaddress());
        details.setPanNumber(req.getpan());
        details.setAadhaarNumber(req.getaadhaar());
        details.setAadhaarPdfPath(aadhaarPath);
        details.setPanPdfPath(panPath);
        details.setAddressProofPdfPath(addrPath);
        userDetailsRepository.save(details);

        
    }

    private String uploadToStorage(Long userId, String logicalName, MultipartFile file) {
        if (file == null || file.isEmpty()) {
            return null;
        }

        String path = userId + "/" + logicalName;

        webClient.post()
            .uri(supabaseUrl + "/storage/v1/object/" + kycBucket + "/" + path)
            .header("Authorization", "Bearer " + serviceRoleKey)
            .header("apikey", serviceRoleKey)
            .contentType(MediaType.parseMediaType(file.getContentType()))
            .bodyValue(file.getResource())
            .retrieve()
            .toBodilessEntity()
            .block();

        return path;
    }
    
    @Transactional
    public void updateDetails(
        Long userId,
        UpdateUserRequest req
    ) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("user not found"));

        UserDetails userDetails = userDetailsRepository.findByUserId(userId)
            .orElseThrow(() -> new RuntimeException("user details not found"));

        // save user 
        user.setName(req.getName());
        user.setEmail(req.getEmail());
        userRepository.save(user);

        userDetails.setPhoneNumber(req.getPhone());
        userDetails.setAddress(req.getAddress());
        userDetails.setPanNumber(req.getPan());
        userDetails.setAadhaarNumber(req.getAadhaar());

        userDetailsRepository.save(userDetails);
    }
    
}
