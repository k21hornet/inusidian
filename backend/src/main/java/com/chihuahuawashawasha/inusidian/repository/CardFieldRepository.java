package com.chihuahuawashawasha.inusidian.repository;

import com.chihuahuawashawasha.inusidian.model.entity.CardField;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CardFieldRepository extends JpaRepository<CardField, Integer> {
    List<CardField> findByDeckId(int deckId);
}
