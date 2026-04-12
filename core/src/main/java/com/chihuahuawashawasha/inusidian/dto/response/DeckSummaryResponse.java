package com.chihuahuawashawasha.inusidian.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DeckSummaryResponse {

    String id;

    String deckName;

    String deckDescription;

    Integer cardCount;

    Integer dueCardCount;

    LocalDateTime createdAt;
}
