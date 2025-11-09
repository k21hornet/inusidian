package com.chihuahuawashawasha.inusidian.controller;

import com.chihuahuawashawasha.inusidian.model.dto.DeckDTO;
import com.chihuahuawashawasha.inusidian.model.dto.DeckIoDTO;
import com.chihuahuawashawasha.inusidian.model.request.DeckInput;
import com.chihuahuawashawasha.inusidian.model.response.DeckListItemResponse;
import com.chihuahuawashawasha.inusidian.model.response.DeckListResponse;
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

    @GetMapping
    public ResponseEntity<DeckListResponse> decks(@AuthenticationPrincipal Jwt jwt) {
        String auth0Id = jwt.getSubject();
        List<DeckListItemResponse> decks = deckService.findAll(auth0Id)
                .stream()
                .map(deckDTO -> {
                    int dueCardCount = cardService.findDueCards(deckDTO.getId()).size();
                    return new DeckListItemResponse(
                        deckDTO.getId(),
                        deckDTO.getDeckName(),
                        deckDTO.getDeckDescription(),
                        deckDTO.getCards().size(),
                        dueCardCount,
                        deckDTO.getCreatedAt()
                    );
                })
                .toList();
        return ResponseEntity.ok(new DeckListResponse(decks.size(), decks));
    }

    @GetMapping("/{id}")
    public ResponseEntity<DeckResponse> deck(@AuthenticationPrincipal Jwt jwt, @PathVariable int id) {
        String auth0Id = jwt.getSubject();
        return ResponseEntity.ok(new DeckResponse(deckService.findById(auth0Id, id)));
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
