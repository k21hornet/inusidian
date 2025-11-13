package com.chihuahuawashawasha.inusidian.model.entity;

import com.chihuahuawashawasha.inusidian.model.entity.base.AbstractBaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "card_fields")
public class CardField extends AbstractBaseEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "deck_id")
    private Deck deck;
    
    private String fieldName;
    
    private String fieldType;

    @OneToMany(mappedBy = "field", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<CardValue> cardValues;
}
