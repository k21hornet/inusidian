package com.chihuahuawashawasha.inusidian.controller;

import com.chihuahuawashawasha.inusidian.dto.*;
import com.chihuahuawashawasha.inusidian.service.CardService;
import com.chihuahuawashawasha.inusidian.service.DeckService;
import com.chihuahuawashawasha.inusidian.security.CurrentUser;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/decks")
@RequiredArgsConstructor
public class DeckController {

    private final DeckService deckService;

    private final CardService cardService;

    @GetMapping
    public ResponseEntity<DeckListDTO> decks(@CurrentUser UserDTO userDTO) {
        List<DeckListDTO.Deck> decks = deckService.findAll(userDTO.getId())
                .getDecks()
                .stream()
                .peek(deck -> {
                    int dueCardCount = cardService.findDueCards(deck.getId()).size();
                    deck.setDueCardCount(dueCardCount);
                })
                .toList();
        return ResponseEntity.ok(DeckListDTO.builder().decks(decks).build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<DeckDTO> deck(@CurrentUser UserDTO userDTO, @PathVariable String id) {
        DeckDTO dto = deckService.findById(userDTO.getId(), id);
        List<CardDTO> cardDTOList = cardService.findCardListByDeck(id);
        dto.setCards(cardDTOList);
        return ResponseEntity.ok(dto);
    }

    @PostMapping("/create")
    public ResponseEntity<DeckDTO> create(
            @CurrentUser UserDTO userDTO,
            @RequestBody @Validated DeckRequest input
    ) {
        return ResponseEntity.ok(deckService.create(userDTO.getId(), input));
    }

    @PutMapping("/update")
    public ResponseEntity<DeckDTO> update(
            @CurrentUser UserDTO userDTO,
            @RequestBody @Validated DeckRequest input
    ) {
        return ResponseEntity.ok(deckService.update(userDTO.getId(), input));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDeck(@PathVariable String id) {
        deckService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}/export")
    public DeckIoDTO exportDeck(
            @CurrentUser UserDTO userDTO,
            @PathVariable String id) {
        return deckService.exportDeck(userDTO.getId(), id);
    }

    @PostMapping("/import")
    public DeckDTO importDeck(
            @CurrentUser UserDTO userDTO,
            @RequestBody DeckIoDTO importData) {
        return deckService.importDeck(userDTO.getId(), importData);
    }
}
