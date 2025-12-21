package com.meticura.meticura.repository;

import com.meticura.meticura.entity.Transaction;
import com.meticura.meticura.entity.TransactionType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, String> {

    List<Transaction> findByUserUserIdOrderByCreatedAtDesc(String userId);

    @Query("""
        SELECT COALESCE(SUM(t.amount), 0)
        FROM Transaction t
        WHERE t.user.userId = :userId
          AND t.transactionType = :type
          AND t.createdAt BETWEEN :startDate AND :endDate
    """)
    Long getTotalAmountByTypeAndDateRange(
            @Param("userId") String userId,
            @Param("type") TransactionType type,
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate
    );

    @Query("""
    SELECT COUNT(t)
    FROM Transaction t
    WHERE CAST(t.createdAt AS DATE) = CAST(CURRENT_TIMESTAMP AS DATE)
    """)
    Long countTransactionsToday();

}
