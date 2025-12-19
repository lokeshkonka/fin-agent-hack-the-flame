package com.meticura.meticura.repository;

import com.meticura.meticura.entity.FraudTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FraudTransactionRepository extends JpaRepository<FraudTransaction, String> {
}
