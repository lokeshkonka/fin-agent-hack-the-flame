package com.meticura.meticura.repository;

import com.meticura.meticura.entity.UserKyc;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserKycRepository extends JpaRepository<UserKyc, String> {
    Optional<UserKyc> findByEmail(String email);
}
