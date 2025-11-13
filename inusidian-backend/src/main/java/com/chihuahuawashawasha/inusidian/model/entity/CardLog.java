package com.chihuahuawashawasha.inusidian.model.entity;

import com.chihuahuawashawasha.inusidian.model.entity.base.AbstractBaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "card_logs")
public class CardLog extends AbstractBaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "card_id")
    private Card card;

    private Integer elapsedTime;

    private Integer nextReviewInterval;
}
