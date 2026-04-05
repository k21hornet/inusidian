package com.chihuahuawashawasha.inusidian.repository;

import com.chihuahuawashawasha.inusidian.entity.CardValue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CardValueRepository extends JpaRepository<CardValue, Integer> {
}
