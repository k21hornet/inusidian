package com.chihuahuawashawasha.inusidian.controller;

import com.chihuahuawashawasha.inusidian.model.dto.DeckDTO;
import com.chihuahuawashawasha.inusidian.model.dto.DeckIoDTO;
import com.chihuahuawashawasha.inusidian.model.dto.DeckSummaryDTO;
import com.chihuahuawashawasha.inusidian.model.input.DeckInput;
import com.chihuahuawashawasha.inusidian.service.DeckService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
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
    public List<DeckSummaryDTO> decks(@AuthenticationPrincipal Jwt jwt) {
        String auth0Id = jwt.getSubject();
        return deckService.findAll(auth0Id);
    }

    @GetMapping("/{id}")
    public DeckDTO deck(@AuthenticationPrincipal Jwt jwt, @PathVariable int id) {
        String auth0Id = jwt.getSubject();
        return deckService.findById(auth0Id, id);
    }

    @PostMapping("/create")
    public DeckDTO create(
            @AuthenticationPrincipal Jwt jwt,
            @RequestBody @Validated DeckInput input,
            BindingResult result
    ){
        if (result.hasErrors()) throw new RuntimeException();
        String auth0Id = jwt.getSubject();
        return deckService.create(auth0Id,input);
    }

    @PutMapping("/update")
    public DeckDTO update(
            @RequestBody @Validated DeckInput input,
            BindingResult result
    ){
        if (result.hasErrors()) throw new RuntimeException();
        return deckService.update(input);
    }

    @DeleteMapping("/{id}")
    public void deleteDeck (@PathVariable int id) {
        deckService.deleteById(id);
    }

    @GetMapping("/{id}/export")
    public DeckIoDTO exportDeck(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable int id) {
        String auth0Id = jwt.getSubject();
        return  deckService.exportDeck(auth0Id, id);
    }

    @PostMapping("/import")
    public DeckDTO importDeck(
            @AuthenticationPrincipal Jwt jwt,
            @RequestBody DeckIoDTO importData) {
        String auth0Id = jwt.getSubject();
        return deckService.importDeck(auth0Id, importData);
    }
}
