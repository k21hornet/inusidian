package com.chihuahuawashawasha.inusidian.controller;

import com.chihuahuawashawasha.inusidian.mapper.CardResponseMapper;
import com.chihuahuawashawasha.inusidian.model.dto.CardDTO;
import com.chihuahuawashawasha.inusidian.model.request.CardInput;
import com.chihuahuawashawasha.inusidian.model.request.CardSuccessInput;
import com.chihuahuawashawasha.inusidian.model.response.CardResponse;
import com.chihuahuawashawasha.inusidian.service.CardService;
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

    private final CardService cardService;

    private final CardResponseMapper mapper;

    @GetMapping("/{id}")
    public ResponseEntity<CardResponse> card(@AuthenticationPrincipal Jwt jwt, @PathVariable int id) {
        String auth0Id = jwt.getSubject();
        return ResponseEntity.ok(mapper.toResponse(cardService.findById(auth0Id, id)));
    }

    @PostMapping("/create")
    public ResponseEntity<CardResponse> create(@RequestBody @Validated CardInput input, BindingResult result) {
        if (result.hasErrors()) throw new RuntimeException();

        return ResponseEntity.ok(mapper.toResponse(cardService.create(input)));
    }

    @PutMapping("/update")
    public ResponseEntity<CardResponse> update(@RequestBody @Validated CardInput input, BindingResult result) {
        if (result.hasErrors()) throw new RuntimeException();

        return ResponseEntity.ok(mapper.toResponse(cardService.update(input)));
    }

    @GetMapping("/review/{deckId}")
    public List<CardDTO> getDueCards(@PathVariable int deckId) {
        return cardService.findDueCards(deckId);
    }

    @PostMapping("/review/{id}/success")
    public ResponseEntity<?> reviewSuccess(
            @PathVariable int id,
            @RequestBody @Validated CardSuccessInput input,
            BindingResult result) {
        if (result.hasErrors()) throw new RuntimeException();

        cardService.success(id, input.getElapsedTime());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/review/{id}/failure")
    public ResponseEntity<?> reviewFailure(@PathVariable int id) {
        cardService.failure(id);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public void deleteCard(@PathVariable int id) {
        cardService.deleteById(id);
    }

    @GetMapping("/next/{deckId}/{cardId}")
    public int nextCardId(
            @PathVariable int deckId,
            @PathVariable int cardId
    ) {
        return cardService.findNextCardId(deckId, cardId);
    }

    @GetMapping("/prev/{deckId}/{cardId}")
    public int prevCardId(
            @PathVariable int deckId,
            @PathVariable int cardId
    ) {
        return cardService.findPrevCardId(deckId, cardId);
    }
}
