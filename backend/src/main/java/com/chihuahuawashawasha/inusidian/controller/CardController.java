package com.chihuahuawashawasha.inusidian.controller;

import com.chihuahuawashawasha.inusidian.model.dto.CardDTO;
import com.chihuahuawashawasha.inusidian.model.input.CardInput;
import com.chihuahuawashawasha.inusidian.service.CardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cards")
@RequiredArgsConstructor
public class CardController {
    private final CardService cardService;

    @GetMapping("/{id}")
    public CardDTO card(@PathVariable int id) {
        return cardService.findById(id);
    }

    @PostMapping("/create")
    public CardDTO create(@RequestBody @Validated CardInput input, BindingResult result) {
        if (result.hasErrors()) throw new RuntimeException();

        return cardService.create(input);
    }

    @GetMapping("/review/{deckId}")
    public List<CardDTO> getDueCards(@PathVariable int deckId) {
        return cardService.findDueCards(deckId);
    }

    @PostMapping("/review/{id}/success")
    public ResponseEntity<?> reviewSuccess(@PathVariable int id) {
        cardService.success(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/review/{id}/failure")
    public ResponseEntity<?> reviewFailure(@PathVariable int id) {
        cardService.failure(id);
        return ResponseEntity.ok().build();
    }
}
