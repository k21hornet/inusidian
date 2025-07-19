package com.chihuahuawashawasha.inusidian.model.input;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.List;

@Data
public class DeckInput {
    @NotBlank
    @Size(max = 50)
    private String deckName;

    @NotBlank
    @Size(max = 100)
    private String deckDescription;

    private List<CardFieldInput> cardFields;

}
