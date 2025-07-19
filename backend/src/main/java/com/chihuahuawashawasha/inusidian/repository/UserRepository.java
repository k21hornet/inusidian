package com.chihuahuawashawasha.inusidian.repository;

import com.chihuahuawashawasha.inusidian.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
}
