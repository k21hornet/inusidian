package com.chihuahuawashawasha.inusidian.model.entity;

import com.chihuahuawashawasha.inusidian.model.entity.base.AbstractBaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "cards")
public class Card extends AbstractBaseEntity {

    @Id
    @Column(name = "id")
    private String id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "deck_id")
    private Deck deck;

    @Column(name = "success_count")
    private Integer successCount;

    @Column(name = "review_interval")
    private Integer reviewInterval;

    @Column(name = "next_review_date")
    private LocalDate nextReviewDate;

    @OneToMany(mappedBy = "id.card", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<CardValue> cardValues;

    @OneToMany(mappedBy = "card", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<CardLog> cardLogs;
}
