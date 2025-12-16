package com.meticura.meticura.repository;

import com.meticura.meticura.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    
    @Query("SELECT t FROM Transaction t WHERE t.originAccount = :accountNumber OR t.destinationAccount = :accountNumber ORDER BY t.date DESC LIMIT 10")
    List<Transaction> findRecentByAccountNumber(String accountNumber);

    @Query("SELECT t FROM Transaction t WHERE (t.originAccount = :accountNumber OR t.destinationAccount = :accountNumber) AND t.date >= :startDate ORDER BY t.date DESC")
    List<Transaction> findByAccountNumberAndDateRange(String accountNumber, LocalDate startDate);
}
