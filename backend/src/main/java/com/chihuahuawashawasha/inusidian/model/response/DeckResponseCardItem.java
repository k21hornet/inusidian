package com.chihuahuawashawasha.inusidian.model.response;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class DeckResponseCardItem {

    Integer id;

    String primaryField;

    String primaryValue;

    Integer successCount;

    Integer reviewInterval;

    private LocalDate nextReviewDate;

    private LocalDateTime createdAt;
}
