package com.chihuahuawashawasha.inusidian.repository;

import com.chihuahuawashawasha.inusidian.model.entity.Card;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface CardRepository extends JpaRepository<Card, Integer> {
    @Query("""
            SELECT c FROM Card c
            WHERE c.deck.id = :deckId
            AND c.nextReviewDate <= :now
            """)
    List<Card> findDueCards(int deckId, LocalDate now);
}
