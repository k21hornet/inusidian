package com.chihuahuawashawasha.inusidian.repository;

import com.chihuahuawashawasha.inusidian.model.entity.Card;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CardRepository extends JpaRepository<Card, Integer> {
}
