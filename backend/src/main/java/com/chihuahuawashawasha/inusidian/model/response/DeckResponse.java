package com.chihuahuawashawasha.inusidian.model.response;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class DeckResponse {

    private Integer id;

    private String deckName;

    private String deckDescription;

    private LocalDateTime createdAt;

    private List<Card> cards;

    private List<CardField> cardFields;

    @Data
    public static class Card {

        private Integer id;

        private Integer deckId;

        private Integer successCount;

        private Integer reviewInterval;

        private LocalDate nextReviewDate;

        private LocalDateTime createdAt;

        private List<CardValue> cardValues;
    }


    @Data
    public static class CardValue {

        private Integer id;

        private CardResponse.CardField field;

        private String content;
    }

    @Data
    public static class CardField {

        private Integer id;

        private String fieldName;

        private String fieldType;
    }
}
