package com.meticura.meticura.repository;

import com.meticura.meticura.entity.FraudTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FraudTransactionRepository extends JpaRepository<FraudTransaction, String> {

    @Query("""
        SELECT COUNT(f)
        FROM FraudTransaction f
        WHERE CAST(f.createdAt AS DATE) = CAST(CURRENT_TIMESTAMP AS DATE)
    """)
    Long countFraudTransactionsToday();

    List<FraudTransaction> findBySenderUserUserId(String userId);  // ✅ fixed
}
