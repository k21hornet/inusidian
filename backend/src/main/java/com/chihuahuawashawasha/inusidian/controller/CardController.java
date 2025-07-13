package com.chihuahuawashawasha.inusidian.controller;

import com.chihuahuawashawasha.inusidian.model.dto.CardDTO;
import com.chihuahuawashawasha.inusidian.model.input.CardInput;
import com.chihuahuawashawasha.inusidian.service.CardService;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

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
}
