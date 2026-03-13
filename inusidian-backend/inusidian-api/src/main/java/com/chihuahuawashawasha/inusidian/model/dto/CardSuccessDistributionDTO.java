package com.chihuahuawashawasha.inusidian.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CardSuccessDistributionDTO {

    private int successCount;

    private long cardsCount;
}
