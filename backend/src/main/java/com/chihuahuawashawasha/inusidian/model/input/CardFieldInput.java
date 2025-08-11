package com.chihuahuawashawasha.inusidian.model.input;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CardFieldInput{
    private Integer fieldId;

    @NotBlank
    @Size(max = 50)
    private String fieldName;

    @NotBlank
    @Size(max = 50)
    private String fieldType;
}
