package com.chihuahuawashawasha.inusidian.model.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CardValueInput {
    @NotNull
    private Integer fieldId;

    @NotBlank
    @Size(max = 255)
    private String content;
}
