package com.meticura.meticura.repository;

import com.meticura.meticura.entity.UserKyc;
import com.meticura.meticura.entity.KycStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserKycRepository extends JpaRepository<UserKyc, String> {
    List<UserKyc> findByStatus(KycStatus status);
    Optional<UserKyc> findByEmail(String email);
}
