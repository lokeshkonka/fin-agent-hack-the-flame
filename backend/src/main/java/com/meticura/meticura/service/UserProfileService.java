package com.meticura.meticura.service;

import com.meticura.meticura.dto.ProfileResponseDto;
import com.meticura.meticura.dto.ProfileUpdateRequest;
import com.meticura.meticura.entity.UserProfile;
import com.meticura.meticura.repository.UserProfileRepository;
import org.springframework.stereotype.Service;

@Service
public class UserProfileService {

    private final UserProfileRepository repo;

    public UserProfileService(UserProfileRepository repo) {
        this.repo = repo;
    }

    public ProfileResponseDto getProfile(String userId, String email) {
        UserProfile profile = repo.findById(userId)
            .orElseGet(() -> {
                UserProfile p = new UserProfile(userId, email);
                return repo.save(p);
            });

        return new ProfileResponseDto(
            profile.getEmail(),
            profile.getFullName(),
            profile.getPhone()
        );
    }

    public ProfileResponseDto updateProfile(String userId, String email,
                                            ProfileUpdateRequest req) {
        UserProfile profile = repo.findById(userId)
            .orElseGet(() -> new UserProfile(userId, email));

        profile.setFullName(req.getFullName());
        profile.setPhone(req.getPhone());
        profile = repo.save(profile);

        return new ProfileResponseDto(
            profile.getEmail(),
            profile.getFullName(),
            profile.getPhone()
        );
    }
}
