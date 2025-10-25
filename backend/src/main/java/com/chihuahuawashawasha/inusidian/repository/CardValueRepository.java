package com.chihuahuawashawasha.inusidian.repository;

import com.chihuahuawashawasha.inusidian.model.entity.CardValue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface CardValueRepository extends JpaRepository<CardValue, Integer> {

    @Query("""
            SELECT DISTINCT cv FROM CardValue cv
            JOIN cv.field cf
            JOIN cv.card c
            WHERE c.deck.id = :deckId
            AND cf.fieldType = 'primary'
            ORDER BY cv.createdAt DESC
            """)
    List<CardValue> findByDeckId(int deckId);
}
