package com.meticura.fin.repositories;

import com.meticura.fin.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long>{
    Optional<User> findById(Long id);
    User findByEmail(String email);
    User findByUserName(String userName);
    
}
