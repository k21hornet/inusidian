package com.chihuahuawashawasha.inusidian.model.entity;

import com.chihuahuawashawasha.inusidian.model.entity.base.AbstractBaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "users")
public class User extends AbstractBaseEntity {
    
    @Id
    @Column(name = "id")
    private String id;

    @Column(name = "user_name")
    private String userName;

    @Column(name = "email")
    private String email;

    @Column(name = "avatar_url")
    private String avatarUrl;
}
