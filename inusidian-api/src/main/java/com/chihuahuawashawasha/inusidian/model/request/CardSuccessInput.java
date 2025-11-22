package com.chihuahuawashawasha.inusidian.model.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CardSuccessInput {
    @NotNull
    private Integer elapsedTime;
}
