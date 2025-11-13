package com.chihuahuawashawasha.inusidian.model.response;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class CardResponse {

    private Integer id;

    private Integer deckId;

    private Integer successCount;

    private Integer reviewInterval;

    private LocalDate nextReviewDate;

    private LocalDateTime createdAt;

    private List<CardValue> cardValues;

    @Data
    public static class CardValue {

        private Integer id;

        private CardField field;

        private String content;
    }

    @Data
    public static class CardField {

        private Integer id;

        private String fieldName;

        private String fieldType;
    }
}
