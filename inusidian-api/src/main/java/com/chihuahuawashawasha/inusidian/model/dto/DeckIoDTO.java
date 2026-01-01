package com.chihuahuawashawasha.inusidian.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

/**
 * デッキ情報のインポート、エクスポートに使用
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DeckIoDTO {
    private DeckInfo deckInfo;
    private List<CardData> cards;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class DeckInfo {
        private String deckName;
        private String deckDescription;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
        private List<CardFieldInfo> cardFields;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CardFieldInfo {
        private String fieldName;
        private String fieldType;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CardData {
        private Integer successCount;
        private Integer reviewInterval;
        private LocalDate nextReviewDate;
        private LocalDateTime cardCreatedAt;
        private LocalDateTime cardUpdatedAt;
        private List<CardFieldValue> fieldValues;
        private List<CardLogData> cardLogs;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CardFieldValue {
        private String fieldName;
        private String content;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CardLogData {
        private Double answerTime;
        private Integer nextReviewInterval;
        private LocalDateTime createdAt;
    }
}
