package com.chihuahuawashawasha.inusidian.service;

import com.chihuahuawashawasha.inusidian.model.dto.DeckDTO;
import com.chihuahuawashawasha.inusidian.model.dto.DeckSummaryDTO;
import com.chihuahuawashawasha.inusidian.model.entity.CardField;
import com.chihuahuawashawasha.inusidian.model.entity.Deck;
import com.chihuahuawashawasha.inusidian.model.entity.User;
import com.chihuahuawashawasha.inusidian.model.input.CardFieldInput;
import com.chihuahuawashawasha.inusidian.model.input.DeckInput;
import com.chihuahuawashawasha.inusidian.repository.CardFieldRepository;
import com.chihuahuawashawasha.inusidian.repository.DeckRepository;
import com.chihuahuawashawasha.inusidian.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class DeckService {
    private final DeckRepository deckRepository;
    private final UserRepository userRepository;
    private final CardFieldRepository cardFieldRepository;

    public List<DeckSummaryDTO> findAll(String authId) {
        return deckRepository.findAllByUserId(authId)
                .stream()
                .map(DeckSummaryDTO::fromEntity)
                .toList();
    }

    public DeckDTO findById(String auth0Id, int id) {
        Deck deck = findDeckById(id);
        if (!auth0Id.equals(deck.getUser().getId())) {
            throw new RuntimeException("UserIdが一致しません");
        }
        return DeckDTO.fromEntity(deck);
    }

    public DeckDTO create(String auth0Id, DeckInput input) {
        User user = userRepository.findById(auth0Id).orElseThrow();

        // deckの基本情報を作成
        Deck deck = new Deck();
        deck.setUser(user);
        deck.setDeckName(input.getDeckName());
        deck.setDeckDescription(input.getDeckDescription());

        // deckのカード属性を作成
        List<CardField> cardFields = new ArrayList<>();
        for (CardFieldInput cfi : input.getCardFields()) {
            CardField cardField = new CardField();
            cardField.setDeck(deck);
            cardField.setFieldName(cfi.getFieldName());
            cardField.setFieldType(cfi.getFieldType());
            cardFields.add(cardField);
        }
        deck.setCardFields(cardFields);

        deck = deckRepository.save(deck);
        return DeckDTO.fromEntity(deck);
    }

    public DeckDTO update(DeckInput input) {
        int deckId = input.getDeckId();
        Deck deck = findDeckById(deckId);
        deck.setDeckName(input.getDeckName());
        deck.setDeckDescription(input.getDeckDescription());

        List<CardField> cardFields = new ArrayList<>();
        for (CardFieldInput cfi : input.getCardFields()) {
            CardField cardField = cardFieldRepository.findById(cfi.getFieldId())
                    .orElseThrow(() -> new EntityNotFoundException("Field Not Found"));
            cardField.setFieldName(cfi.getFieldName());
            cardFields.add(cardField);
        }
        deck.getCardFields().clear();
        deck.getCardFields().addAll(cardFields);

        deck = deckRepository.save(deck);
        return DeckDTO.fromEntity(deck);
    }

    public void deleteById(int id) {
        deckRepository.deleteById(id);
    }

    private Deck findDeckById(int id) {
        return deckRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Deck Not Found"));
    }

}
