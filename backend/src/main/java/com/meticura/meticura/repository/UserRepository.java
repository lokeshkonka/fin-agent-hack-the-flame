package com.meticura.meticura.repository;

import com.meticura.meticura.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, String> {

    Optional<User> findByEmail(String email);

    Optional<User> findByAccountId(String accountId);

    Long countByIsFrozenTrue();

    List<User> findByIsFrozenTrue();

}
