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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
    
    private String deckName;
    
    private String deckDescription;

    @OneToMany(mappedBy = "deck", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Card> cards;

    @OneToMany(mappedBy = "deck", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<CardField> cardFields;

    // デッキにカードが一枚も含まれていない場合
    public List<Card> getCards() {
        if (cards == null) {
            return Collections.emptyList();
        }
        return cards;
    }
}
