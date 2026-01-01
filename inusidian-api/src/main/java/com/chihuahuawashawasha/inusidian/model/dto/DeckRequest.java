package com.chihuahuawashawasha.inusidian.model.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.List;

@Data
public class DeckRequest {

    private String deckId;

    @NotBlank
    @Size(max = 50)
    private String deckName;

    @NotBlank
    @Size(max = 100)
    private String deckDescription;

    private List<CardFieldRequest> cardFields;
}
