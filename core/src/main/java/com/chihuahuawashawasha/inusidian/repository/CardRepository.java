package com.chihuahuawashawasha.inusidian.repository;

import com.chihuahuawashawasha.inusidian.entity.Card;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface CardRepository extends JpaRepository<Card, String> {

    @Query("""
            SELECT
                c
            FROM
                Card c
            WHERE
                c.deck.user.id = :userId
                AND c.id = :id
            """)
    Optional<Card> find(String userId, String id);

    @Query("""
            SELECT c FROM Card c
            WHERE c.deck.id = :deckId
            ORDER BY c.createdAt DESC
            """)
    List<Card> findCards(String deckId);

    @Query("""
            SELECT c FROM Card c
            WHERE c.deck.id = :deckId
            AND c.nextReviewDate <= :now
            """)
    List<Card> findDueCards(String deckId, LocalDate now);

    @Query("""
            SELECT c.id FROM Card c
            WHERE c.deck.id = :deckId
            ORDER BY c.createdAt DESC
            """)
    List<String> findIdByDeckId(String deckId);

    @Query("""
            SELECT CAST(c.createdAt AS LocalDate), COUNT(c)
            FROM Card c
            WHERE c.deck.user.id = :userId AND c.createdAt >= :since
            GROUP BY CAST(c.createdAt AS LocalDate)
            """)
    List<Object[]> countNewCardsByDayForUser(String userId, LocalDateTime since);

    @Query("""
            SELECT c.successCount, COUNT(c)
            FROM Card c
            WHERE c.deck.user.id = :userId
            GROUP BY c.successCount ORDER BY c.successCount ASC
            """)
    List<Object[]> countCardsBySuccessCount(String userId);

    @Query("""
            SELECT DISTINCT DAY(c.createdAt)
            FROM Card c
            WHERE c.deck.user.id = :userId
              AND YEAR(c.createdAt) = :year AND MONTH(c.createdAt) = :month
            """)
    List<Integer> findNewCardDaysInMonth(String userId, int year, int month);
}
