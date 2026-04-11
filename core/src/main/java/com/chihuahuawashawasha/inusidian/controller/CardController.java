package com.chihuahuawashawasha.inusidian.controller;

import com.chihuahuawashawasha.inusidian.dto.CardDTO;
import com.chihuahuawashawasha.inusidian.dto.UserDTO;
import com.chihuahuawashawasha.inusidian.dto.request.CardRequest;
import com.chihuahuawashawasha.inusidian.dto.request.CardSuccessRequest;
import com.chihuahuawashawasha.inusidian.service.CardService;
import com.chihuahuawashawasha.inusidian.security.CurrentUser;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cards")
@RequiredArgsConstructor
public class CardController {

    private final CardService cardService;

    @GetMapping("/{id}")
    public ResponseEntity<CardDTO> card(@CurrentUser UserDTO userDTO, @PathVariable String id) {
        return ResponseEntity.ok(cardService.findById(userDTO.getId(), id));
    }

    @PostMapping("/create")
    public ResponseEntity<CardDTO> create(@RequestBody @Validated CardRequest request) {
        return ResponseEntity.ok(cardService.create(request));
    }

    @PutMapping("/update")
    public ResponseEntity<CardDTO> update(@RequestBody @Validated CardRequest request) {
        return ResponseEntity.ok(cardService.update(request));
    }

    @GetMapping("/review/{deckId}")
    public List<CardDTO> getDueCards(@PathVariable String deckId) {
        return cardService.findDueCards(deckId);
    }

    @PostMapping("/review/{id}/success")
    public ResponseEntity<Void> reviewSuccess(
            @PathVariable String id,
            @RequestBody @Validated CardSuccessRequest request) {
        cardService.success(id, request.getAnswerTime());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/review/{id}/failure")
    public ResponseEntity<Void> reviewFailure(
            @PathVariable String id,
            @RequestBody @Validated CardSuccessRequest request) {
        cardService.failure(id, request.getAnswerTime());
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public void deleteCard(@PathVariable String id) {
        cardService.deleteById(id);
    }

    @GetMapping("/next/{deckId}/{cardId}")
    public ResponseEntity<String> nextCardId(
            @PathVariable String deckId,
            @PathVariable String cardId
    ) {
        return ResponseEntity.ok(cardService.findNextCardId(deckId, cardId));
    }

    @GetMapping("/prev/{deckId}/{cardId}")
    public ResponseEntity<String> prevCardId(
            @PathVariable String deckId,
            @PathVariable String cardId
    ) {
        return ResponseEntity.ok(cardService.findPrevCardId(deckId, cardId));
    }
}
