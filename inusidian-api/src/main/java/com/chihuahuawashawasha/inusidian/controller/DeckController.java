package com.chihuahuawashawasha.inusidian.controller;

import com.chihuahuawashawasha.inusidian.mapper.DeckResponseMapper;
import com.chihuahuawashawasha.inusidian.mapper.DecksResponseMapper;
import com.chihuahuawashawasha.inusidian.model.dto.DeckDTO;
import com.chihuahuawashawasha.inusidian.model.dto.DeckIoDTO;
import com.chihuahuawashawasha.inusidian.model.request.DeckInput;
import com.chihuahuawashawasha.inusidian.model.response.DecksResponse;
import com.chihuahuawashawasha.inusidian.model.response.DeckResponse;
import com.chihuahuawashawasha.inusidian.service.CardService;
import com.chihuahuawashawasha.inusidian.service.DeckService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
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

    private final CardService cardService;

    private final DecksResponseMapper decksResponseMapper;

    private final DeckResponseMapper deckResponseMapper;

    @GetMapping
    public ResponseEntity<DecksResponse> decks(@AuthenticationPrincipal Jwt jwt) {
        String auth0Id = jwt.getSubject();
        List<DecksResponse.DeckListItem> decks = deckService.findAll(auth0Id).stream()
                .map(deck -> {
                    int dueCardCount = cardService.findDueCards(deck.getId()).size();
                    return decksResponseMapper.toResponse(deck, dueCardCount);
                })
                .toList();
        return ResponseEntity.ok(decksResponseMapper.toResponse(decks));
    }

    @GetMapping("/{id}")
    public ResponseEntity<DeckResponse> deck(@AuthenticationPrincipal Jwt jwt, @PathVariable int id) {
        String auth0Id = jwt.getSubject();
        DeckDTO dto = deckService.findById(auth0Id, id);
        return ResponseEntity.ok(deckResponseMapper.toResponse(dto));
    }

    @PostMapping("/create")
    public ResponseEntity<DeckResponse> create(
            @AuthenticationPrincipal Jwt jwt,
            @RequestBody @Validated DeckInput input,
            BindingResult result
    ){
        if (result.hasErrors()) throw new RuntimeException();
        String auth0Id = jwt.getSubject();
        return ResponseEntity.ok(deckResponseMapper.toResponse(deckService.create(auth0Id,input)));
    }

    @PutMapping("/update")
    public ResponseEntity<DeckResponse> update(
            @RequestBody @Validated DeckInput input,
            BindingResult result
    ){
        if (result.hasErrors()) throw new RuntimeException();
        return ResponseEntity.ok(deckResponseMapper.toResponse(deckService.update(input)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDeck (@PathVariable int id) {
        deckService.deleteById(id);
        return ResponseEntity.noContent().build();
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
