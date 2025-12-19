package com.meticura.meticura.service;

import com.meticura.meticura.dto.*;
import com.meticura.meticura.entity.*;
import com.meticura.meticura.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminService {

    private static final Logger logger = LoggerFactory.getLogger(AdminService.class);

    private final UserRepository userRepository;
    private final TransactionRepository transactionRepository;
    private final FraudTransactionRepository fraudTransactionRepository;
    private final UserKycRepository userKycRepository;

    public AdminService(UserRepository userRepository,
                       TransactionRepository transactionRepository,
                       FraudTransactionRepository fraudTransactionRepository,
                       UserKycRepository userKycRepository) {
        this.userRepository = userRepository;
        this.transactionRepository = transactionRepository;
        this.fraudTransactionRepository = fraudTransactionRepository;
        this.userKycRepository = userKycRepository;
    }

    /**
     * ✅ Route 1: Get admin stats
     */
    public AdminStatsDto getAdminStats() {
        Long totalUsers = userRepository.count();
        Long totalFrozenUsers = userRepository.countByIsFrozenTrue();
        Long totalTransactionsToday = transactionRepository.countTransactionsToday();
        Long totalFraudTransactionsToday = fraudTransactionRepository.countFraudTransactionsToday();
        Long totalKycPending = (long) userKycRepository.findByStatus(KycStatus.PENDING).size();

        logger.info("Admin stats retrieved");
        return new AdminStatsDto(totalUsers, totalFrozenUsers, totalTransactionsToday,
                totalFraudTransactionsToday, totalKycPending);
    }

    /**
     * ✅ Route 2: Get all frozen users
     */
    public List<FrozenUserDto> getFrozenUsers() {
        List<User> frozenUsers = userRepository.findByIsFrozenTrue();
        logger.info("Retrieved {} frozen users", frozenUsers.size());
        
        return frozenUsers.stream()
                .map(u -> new FrozenUserDto(u.getUserId(), u.getEmail(), u.getName()))
                .collect(Collectors.toList());
    }

    /**
     * ✅ Route 3: Get user details & fraud transactions by userId
     */
    public UserFraudDetailDto getUserFraudDetails(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<FraudTransaction> fraudTxs = fraudTransactionRepository.findBySenderUserUserId(user.getUserId());



        UserFraudDetailDto dto = new UserFraudDetailDto();
        dto.setUserId(user.getUserId());
        dto.setEmail(user.getEmail());
        dto.setName(user.getName());
        dto.setBalance(user.getBalance());
        dto.setIsFrozen(user.getIsFrozen());

        List<FraudTransactionDetailDto> fraudList = fraudTxs.stream()
                .map(f -> new FraudTransactionDetailDto(
                        f.getFraudTransactionId(),
                        f.getReceiverAccountId(),
                        f.getAmount(),
                        f.getFraudType(),
                        f.getFraudReason(),
                        f.getCreatedAt()
                ))
                .collect(Collectors.toList());

        dto.setFraudTransactions(fraudList);
        logger.info("Retrieved fraud details for user: {}", userId);
        return dto;
    }

    /**
     * ✅ Route 4: Get all pending KYC users
     */
    public List<PendingKycUserDto> getPendingKycUsers() {
        List<UserKyc> pendingKyc = userKycRepository.findByStatus(KycStatus.PENDING);
        logger.info("Retrieved {} pending KYC users", pendingKyc.size());

        return pendingKyc.stream()
                .map(k -> new PendingKycUserDto(k.getUserId(), k.getEmail(), k.getName()))
                .collect(Collectors.toList());
    }

    /**
     * ✅ Route 5: Get KYC details by email
     */
    public KycDetailsDto getKycDetails(String email) {
        UserKyc kyc = userKycRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("KYC not found for email: " + email));

        KycDetailsDto dto = new KycDetailsDto();
        dto.setUserId(kyc.getUserId());
        dto.setEmail(kyc.getEmail());
        dto.setName(kyc.getName());
        dto.setPhoneNumber(kyc.getPhoneNumber());
        dto.setAddress(kyc.getAddress());
        dto.setAadharNumber(kyc.getAadharNumber());
        dto.setPanNumber(kyc.getPanNumber());
        dto.setKycStatus(kyc.getStatus().toString());
        dto.setAadharPdfUrl(kyc.getAadharPdfPath());
        dto.setPanPdfUrl(kyc.getPanPdfPath());
        dto.setProfilePicUrl(kyc.getProfilePicPath());

        logger.info("Retrieved KYC details for: {}", email);
        return dto;
    }

    /**
     * ✅ Route 6: Unfreeze user and delete fraud transactions
     */
    public String unfreezeUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.getIsFrozen()) {
            return "User is not frozen";
        }

        // Delete all fraud transactions for this user
        List<FraudTransaction> fraudTxs = fraudTransactionRepository.findBySenderUserUserId(user.getUserId());

        fraudTransactionRepository.deleteAll(fraudTxs);
        logger.info("Deleted {} fraud transactions for user: {}", fraudTxs.size(), email);

        // Unfreeze user
        user.setIsFrozen(false);
        userRepository.save(user);

        logger.info("User unfrozen: {}", email);
        return "User unfrozen successfully and fraud transactions deleted";
    }

    public String approveKyc(String email) {
    UserKyc kyc = userKycRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("KYC not found for email: " + email));

    kyc.setStatus(KycStatus.APPROVED);
    userKycRepository.save(kyc);

    // optional: ensure user exists and is unfrozen
    User user = userRepository.findById(kyc.getUserId())
            .orElseThrow(() -> new RuntimeException("User entity not found for KYC userId"));

    // if you were freezing users on fraud, you may keep this, or remove if not needed
    user.setIsFrozen(false);
    userRepository.save(user);

    return "KYC approved successfully";
}

}
