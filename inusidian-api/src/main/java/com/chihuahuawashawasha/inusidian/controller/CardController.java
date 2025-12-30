package com.chihuahuawashawasha.inusidian.controller;

import com.chihuahuawashawasha.inusidian.model.dto.CardDTO;
import com.chihuahuawashawasha.inusidian.model.dto.UserDTO;
import com.chihuahuawashawasha.inusidian.model.dto.CardRequest;
import com.chihuahuawashawasha.inusidian.model.dto.CardSuccessRequest;
import com.chihuahuawashawasha.inusidian.service.CardService;
import com.chihuahuawashawasha.inusidian.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cards")
@RequiredArgsConstructor
public class CardController {

    private final UserService userService;

    private final CardService cardService;

    @GetMapping("/{id}")
    public ResponseEntity<CardDTO> card(@AuthenticationPrincipal Jwt jwt, @PathVariable String id) {
        UserDTO userDTO = userService.findByEmail(jwt.getClaimAsString("http://claim/email"));

        return ResponseEntity.ok(cardService.findById(userDTO.getId(), id));
    }

    @PostMapping("/create")
    public ResponseEntity<CardDTO> create(@RequestBody @Validated CardRequest input) {

        return ResponseEntity.ok(cardService.create(input));
    }

    @PutMapping("/update")
    public ResponseEntity<CardDTO> update(@RequestBody @Validated CardRequest input) {

        return ResponseEntity.ok(cardService.update(input));
    }

    @GetMapping("/review/{deckId}")
    public List<CardDTO> getDueCards(@PathVariable String deckId) {
        return cardService.findDueCards(deckId);
    }

    @PostMapping("/review/{id}/success")
    public ResponseEntity<Void> reviewSuccess(
            @PathVariable String id,
            @RequestBody @Validated CardSuccessRequest input,
            BindingResult result) {
        if (result.hasErrors()) throw new RuntimeException();

        cardService.success(id, input.getElapsedTime());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/review/{id}/failure")
    public ResponseEntity<Void> reviewFailure(@PathVariable String id) {
        cardService.failure(id);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public void deleteCard(@PathVariable String id) {
        cardService.deleteById(id);
    }

    @GetMapping("/next/{deckId}/{cardId}")
    public String nextCardId(
            @PathVariable String deckId,
            @PathVariable String cardId
    ) {
        return cardService.findNextCardId(deckId, cardId);
    }

    @GetMapping("/prev/{deckId}/{cardId}")
    public String prevCardId(
            @PathVariable String deckId,
            @PathVariable String cardId
    ) {
        return cardService.findPrevCardId(deckId, cardId);
    }
}
