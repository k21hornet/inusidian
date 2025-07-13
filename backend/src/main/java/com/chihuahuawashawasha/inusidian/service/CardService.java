package com.chihuahuawashawasha.inusidian.service;

import com.chihuahuawashawasha.inusidian.model.dto.CardDTO;
import com.chihuahuawashawasha.inusidian.model.entity.Card;
import com.chihuahuawashawasha.inusidian.model.entity.CardField;
import com.chihuahuawashawasha.inusidian.model.entity.CardValue;
import com.chihuahuawashawasha.inusidian.model.input.CardInput;
import com.chihuahuawashawasha.inusidian.model.input.CardValueInput;
import com.chihuahuawashawasha.inusidian.repository.CardFieldRepository;
import com.chihuahuawashawasha.inusidian.repository.CardRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class CardService {
    private final CardRepository cardRepository;
    private final CardFieldRepository cardFieldRepository;

    public CardDTO findById(int id) {
        Card card = cardRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Card Not Found"));
        return CardDTO.fromEntity(card);
    }

    public CardDTO create(CardInput input) {
        // カードを作成
        Card card = new Card();

        // カード情報を属性ごとに作成
        List<CardValue> cardValues = new ArrayList<>();
        for (CardValueInput cvi : input.getValues()) {
            // カード属性を取得
            CardField field = cardFieldRepository.findById(cvi.getFieldId())
                    .orElseThrow(() -> new EntityNotFoundException("Field Not Found"));

            CardValue cardValue = new CardValue();
            cardValue.setCard(card);
            cardValue.setField(field);
            cardValue.setContent(cvi.getContent());
            cardValues.add(cardValue);
        }
        card.setCardValues(cardValues);

        card = cardRepository.save(card);
        return CardDTO.fromEntity(card);
    }
}
