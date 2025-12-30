package com.chihuahuawashawasha.inusidian.repository;

import com.chihuahuawashawasha.inusidian.model.entity.Deck;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DeckRepository extends JpaRepository<Deck, String> {

    List<Deck> findAllByUserId(String userId);

    @Query("""
            SELECT
                d
            FROM
                Deck d
            WHERE
                d.user.id = :userId
                AND d.id = :id
            """)
    Deck find(String userId, String id);
}
