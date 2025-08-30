package com.chihuahuawashawasha.inusidian.model.input;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class CardSuccessInput {
    @NotNull
    private Integer elapsedTime;
}
