package com.chihuahuawashawasha.inusidian.model.entity;

import com.chihuahuawashawasha.inusidian.model.entity.base.AbstractBaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "card_values")
public class CardValue extends AbstractBaseEntity {
    
    @EmbeddedId
    private CardValueId id;

    @Column(name = "content")
    private String content;

    @Getter
    @Setter
    @Embeddable
    public static class CardValueId {

        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "card_id")
        private Card card;

        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "card_field_id")
        private CardField field;
    }
}
