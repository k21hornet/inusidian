package com.chihuahuawashawasha.inusidian.repository;

import com.chihuahuawashawasha.inusidian.entity.CardLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface CardLogRepository extends JpaRepository<CardLog, Integer> {

    @Query("""
            SELECT CAST(cl.createdAt AS LocalDate), COUNT(cl)
            FROM CardLog cl
            WHERE cl.card.deck.user.id = :userId AND cl.createdAt >= :since
            GROUP BY CAST(cl.createdAt AS LocalDate)
            """)
    List<Object[]> countReviewsByDayForUser(String userId, LocalDateTime since);

    @Query("""
            SELECT DISTINCT DAY(cl.createdAt)
            FROM CardLog cl
            WHERE cl.card.deck.user.id = :userId
              AND YEAR(cl.createdAt) = :year AND MONTH(cl.createdAt) = :month
            """)
    List<Integer> findStudiedDaysFromLogs(String userId, int year, int month);
}
