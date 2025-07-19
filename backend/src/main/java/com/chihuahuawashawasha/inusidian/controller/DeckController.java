package com.chihuahuawashawasha.inusidian.controller;

import com.chihuahuawashawasha.inusidian.model.dto.DeckDTO;
import com.chihuahuawashawasha.inusidian.model.dto.DeckSummaryDTO;
import com.chihuahuawashawasha.inusidian.model.input.DeckInput;
import com.chihuahuawashawasha.inusidian.service.DeckService;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/decks")
@RequiredArgsConstructor
public class DeckController {
    private final DeckService deckService;

    @GetMapping
    public List<DeckSummaryDTO> decks() {
        return deckService.findAll();
    }

    @GetMapping("/{id}")
    public DeckDTO deck(@PathVariable int id) {
        return deckService.findById(id);
    }

    @PostMapping("/create")
    public DeckDTO create(@RequestBody @Validated DeckInput input, BindingResult result){
        if (result.hasErrors()) throw new RuntimeException();

        return deckService.create(input);
    }

    @DeleteMapping("/{id}")
    public void deleteDeck (@PathVariable int id) {
        deckService.deleteById(id);
    }
}
