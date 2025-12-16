package com.meticura.meticura.service;

import com.meticura.meticura.entity.User;
import com.meticura.meticura.entity.UserDetails;
import com.meticura.meticura.entity.Account;
import com.meticura.meticura.repository.UserRepository;
import com.meticura.meticura.repository.UserDetailsRepository;
import com.meticura.meticura.repository.AccountRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    private final UserRepository userRepository;
    private final UserDetailsRepository userDetailsRepository;
    private final AccountRepository accountRepository;

    public UserService(UserRepository userRepository,
                      UserDetailsRepository userDetailsRepository,
                      AccountRepository accountRepository) {
        this.userRepository = userRepository;
        this.userDetailsRepository = userDetailsRepository;
        this.accountRepository = accountRepository;
    }

    /**
     * Get or create user by Supabase ID
     */
    @Transactional
    public Long getOrCreateUser(String supabaseId, String email, String name) {
        Optional<User> existingUser = userRepository.findBySupabaseId(supabaseId);

        if (existingUser.isPresent()) {
            return existingUser.get().getId();
        }

        User newUser = new User();
        newUser.setSupabaseId(supabaseId);
        newUser.setEmail(email);
        newUser.setName(name);
        newUser.setRole("user"); // default role
        newUser.setIsFreezApproved(false);

        User savedUser = userRepository.save(newUser);
        logger.info("New user created: {} ({})", savedUser.getId(), email);

        return savedUser.getId();
    }

    /**
     * Create user details
     */
    @Transactional
    public UserDetails createUserDetails(Long userId,
                                        String phoneNumber,
                                        String address,
                                        String panNumber,
                                        String aadharNumber,
                                        String aadharFilePath,
                                        String panFilePath,
                                        String profilePicPath) {

        // Check if details already exist
        Optional<UserDetails> existing = userDetailsRepository.findByUserId(userId);
        if (existing.isPresent()) {
            throw new RuntimeException("User details already exist for user: " + userId);
        }

        UserDetails details = new UserDetails();
        details.setUserId(userId);
        details.setPhoneNumber(phoneNumber);
        details.setAddress(address);
        details.setPanNumber(panNumber);
        details.setAadharNumber(aadharNumber);
        details.setAadharFilePath(aadharFilePath);
        details.setPanFilePath(panFilePath);
        details.setProfilePicturePath(profilePicPath);

        UserDetails savedDetails = userDetailsRepository.save(details);
        logger.info("User details created for user: {}", userId);

        return savedDetails;
    }

    /**
     * Create default account for user
     */
    @Transactional
    public Account createDefaultAccount(Long userId) {
        // Check if account already exists
        var existingAccounts = accountRepository.findByUserId(userId);
        if (!existingAccounts.isEmpty()) {
            logger.warn("Account already exists for user: {}", userId);
            return existingAccounts.get(0);
        }

        Account account = new Account();
        account.setUserId(userId);
        account.setAccountNumber(generateAccountNumber());
        account.setBalance(BigDecimal.ZERO);
        account.setDailyTransactionLimit(BigDecimal.valueOf(100000)); // 1 lakh default
        account.setMonthlyTransactionLimit(BigDecimal.valueOf(500000)); // 5 lakh default
        account.setDailyTransactionLimitRemaining(BigDecimal.valueOf(100000));
        account.setMonthlyTransactionLimitRemaining(BigDecimal.valueOf(500000));
        account.setTotalExpense(BigDecimal.ZERO);
        account.setTotalIncome(BigDecimal.ZERO);
        account.setIsFlaggedFraud(false);

        Account savedAccount = accountRepository.save(account);
        logger.info("Default account created for user: {} - {}", userId, savedAccount.getAccountNumber());

        return savedAccount;
    }

    /**
     * Update user details
     */
    @Transactional
    public void updateUserDetails(Long userId, String name, String email,
                                 String phoneNumber, String address,
                                 String panNumber, String aadharNumber) {

        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found: " + userId));

        UserDetails userDetails = userDetailsRepository.findByUserId(userId)
            .orElseThrow(() -> new RuntimeException("User details not found for user: " + userId));

        user.setName(name);
        user.setEmail(email);
        userRepository.save(user);

        userDetails.setPhoneNumber(phoneNumber);
        userDetails.setAddress(address);
        userDetails.setPanNumber(panNumber);
        userDetails.setAadharNumber(aadharNumber);
        userDetailsRepository.save(userDetails);

        logger.info("User details updated for user: {}", userId);
    }

    /**
     * Generate unique account number (ABC123456 format)
     */
    private String generateAccountNumber() {
        String prefix = "ABC";
        String randomPart = String.format("%06d", (int) (Math.random() * 1000000));
        return prefix + randomPart;
    }


    public UserDetails getUserDetailsById(Long userId) {
    return userDetailsRepository.findByUserId(userId)
        .orElseThrow(() -> new RuntimeException("User details not found for user: " + userId));
}

}
