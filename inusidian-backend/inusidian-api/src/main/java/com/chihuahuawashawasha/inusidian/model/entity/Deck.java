package com.chihuahuawashawasha.inusidian.model.entity;

import com.chihuahuawashawasha.inusidian.model.entity.base.AbstractBaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "decks")
public class Deck extends AbstractBaseEntity {
    
    @Id
    @Column(name = "id")
    private String id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "deck_name")
    private String deckName;

    @Column(name = "deck_description")
    private String deckDescription;

    @OneToMany(mappedBy = "deck", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Card> cards;

    @OneToMany(mappedBy = "deck", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<CardField> cardFields;
}
