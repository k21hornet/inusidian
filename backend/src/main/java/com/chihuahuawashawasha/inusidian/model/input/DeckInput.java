package com.chihuahuawashawasha.inusidian.model.input;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.util.List;

@Data
public class DeckInput {
    @NotBlank
    @Max(50)
    private String deckName;

    @NotBlank
    @Max(100)
    private String deckDescription;

    private List<CardFieldInput> cardFields;

}
