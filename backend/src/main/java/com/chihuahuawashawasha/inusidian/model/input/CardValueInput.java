package com.chihuahuawashawasha.inusidian.model.input;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CardValueInput {
    @NotNull
    private Integer fieldId;

    @NotBlank
    @Max(255)
    private String content;
}
