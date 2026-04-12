package com.chihuahuawashawasha.inusidian.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CardSuccessRequest {
    @NotNull
    private Double answerTime;
}
