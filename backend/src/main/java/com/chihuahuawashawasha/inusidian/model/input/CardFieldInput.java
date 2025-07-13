package com.chihuahuawashawasha.inusidian.model.input;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CardFieldInput{
    @NotBlank
    @Max(50)
    private String fieldName;

    @NotBlank
    @Max(50)
    private String fieldType;
}
