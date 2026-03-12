package com.chihuahuawashawasha.inusidian.model.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CardValueRequest {
    @NotNull
    private Integer cardFieldId;

    @NotBlank
    @Size(max = 255)
    private String content;
}
