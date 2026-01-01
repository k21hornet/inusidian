package com.chihuahuawashawasha.inusidian.controller;

import com.chihuahuawashawasha.inusidian.model.dto.*;
import com.chihuahuawashawasha.inusidian.service.CardService;
import com.chihuahuawashawasha.inusidian.service.DeckService;
import com.chihuahuawashawasha.inusidian.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/decks")
@RequiredArgsConstructor
public class DeckController {

    private final UserService userService;

    private final DeckService deckService;

    private final CardService cardService;

    @GetMapping
    public ResponseEntity<DeckListDTO> decks(@AuthenticationPrincipal Jwt jwt) {
        UserDTO userDTO = userService.findByEmail(jwt.getClaimAsString("http://claim/email"));

        // デッキ一覧を取得し、復習カード枚数を追加
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
    public ResponseEntity<DeckDTO> deck(@AuthenticationPrincipal Jwt jwt, @PathVariable String id) {
        UserDTO userDTO = userService.findByEmail(jwt.getClaimAsString("http://claim/email"));

        DeckDTO dto = deckService.findById(userDTO.getId(), id);
        return ResponseEntity.ok(dto);
    }

    @PostMapping("/create")
    public ResponseEntity<DeckDTO> create(
            @AuthenticationPrincipal Jwt jwt,
            @RequestBody @Validated DeckRequest input
    ){
        UserDTO userDTO = userService.findByEmail(jwt.getClaimAsString("http://claim/email"));

        return ResponseEntity.ok(deckService.create(userDTO.getId(),input));
    }

    @PutMapping("/update")
    public ResponseEntity<DeckDTO> update(
            @AuthenticationPrincipal Jwt jwt,
            @RequestBody @Validated DeckRequest input
    ){
        UserDTO userDTO = userService.findByEmail(jwt.getClaimAsString("http://claim/email"));

        return ResponseEntity.ok(deckService.update(userDTO.getId(), input));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDeck (@PathVariable String id) {
        deckService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}/export")
    public DeckIoDTO exportDeck(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable String id) {
        UserDTO userDTO = userService.findByEmail(jwt.getClaimAsString("http://claim/email"));

        return  deckService.exportDeck(userDTO.getId(), id);
    }

    @PostMapping("/import")
    public DeckDTO importDeck(
            @AuthenticationPrincipal Jwt jwt,
            @RequestBody DeckIoDTO importData) {
        UserDTO userDTO = userService.findByEmail(jwt.getClaimAsString("http://claim/email"));

        return deckService.importDeck(userDTO.getId(), importData);
    }
}
