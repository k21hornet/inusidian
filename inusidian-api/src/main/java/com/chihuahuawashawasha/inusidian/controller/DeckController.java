package com.chihuahuawashawasha.inusidian.controller;

import com.chihuahuawashawasha.inusidian.model.dto.DeckDTO;
import com.chihuahuawashawasha.inusidian.model.dto.DeckListDTO;
import com.chihuahuawashawasha.inusidian.model.dto.UserDTO;
import com.chihuahuawashawasha.inusidian.model.dto.DeckRequest;
import com.chihuahuawashawasha.inusidian.service.DeckService;
import com.chihuahuawashawasha.inusidian.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/decks")
@RequiredArgsConstructor
public class DeckController {

    private final UserService userService;

    private final DeckService deckService;

    @GetMapping
    public ResponseEntity<DeckListDTO> decks(@AuthenticationPrincipal Jwt jwt) {
        UserDTO userDTO = userService.findByEmail(jwt.getClaimAsString("http://claim/email"));

        return ResponseEntity.ok(deckService.findAll(userDTO.getId()));
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
            @RequestBody @Validated DeckRequest input
    ){
        return ResponseEntity.ok(deckService.update(input));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDeck (@PathVariable String id) {
        deckService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

//    @GetMapping("/{id}/export")
//    public DeckIoDTO exportDeck(
//            @AuthenticationPrincipal Jwt jwt,
//            @PathVariable int id) {
//        String auth0Id = jwt.getSubject();
//        return  deckService.exportDeck(auth0Id, id);
//    }
//
//    @PostMapping("/import")
//    public DeckDTO importDeck(
//            @AuthenticationPrincipal Jwt jwt,
//            @RequestBody DeckIoDTO importData) {
//        String auth0Id = jwt.getSubject();
//        return deckService.importDeck(auth0Id, importData);
//    }
}
