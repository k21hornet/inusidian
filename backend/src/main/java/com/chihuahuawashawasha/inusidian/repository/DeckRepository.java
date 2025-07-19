package com.chihuahuawashawasha.inusidian.repository;

import com.chihuahuawashawasha.inusidian.model.entity.Deck;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeckRepository extends JpaRepository<Deck, Integer> {
}
