package com.chihuahuawashawasha.inusidian.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/decks")
@RequiredArgsConstructor
public class DeckController {
    @GetMapping
    public String index() {
        return "hello";
    }
}
