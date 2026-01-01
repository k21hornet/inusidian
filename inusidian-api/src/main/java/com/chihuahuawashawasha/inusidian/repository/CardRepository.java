package com.chihuahuawashawasha.inusidian.repository;

import com.chihuahuawashawasha.inusidian.model.entity.Card;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
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
            AND c.nextReviewDate <= :now
            """)
    List<Card> findDueCards(String deckId, LocalDate now);

    @Query("""
            SELECT c.id FROM Card c
            WHERE c.deck.id = :deckId
            """)
    List<String> findIdByDeckId(String deckId);
}
