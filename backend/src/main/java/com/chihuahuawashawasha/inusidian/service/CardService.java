package com.chihuahuawashawasha.inusidian.service;

import com.chihuahuawashawasha.inusidian.model.dto.CardDTO;
import com.chihuahuawashawasha.inusidian.model.entity.*;
import com.chihuahuawashawasha.inusidian.model.input.CardInput;
import com.chihuahuawashawasha.inusidian.model.input.CardValueInput;
import com.chihuahuawashawasha.inusidian.repository.CardFieldRepository;
import com.chihuahuawashawasha.inusidian.repository.CardRepository;
import com.chihuahuawashawasha.inusidian.repository.DeckRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class CardService {
    private final CardRepository cardRepository;
    private final CardFieldRepository cardFieldRepository;
    private final DeckRepository deckRepository;

    public CardDTO findById(int id) {
        Card card = findCardById(id);
        return CardDTO.fromEntity(card);
    }

    public CardDTO create(CardInput input) {
        // カードを作成
        Card card = new Card();

        // 紐づくDeckを取得 TODO
        Deck deck = deckRepository.findById(input.getDeckId()).orElseThrow();
        card.setDeck(deck);

        // カード情報を属性ごとに作成
        List<CardValue> cardValues = getCardValue(card, input);
        card.setCardValues(cardValues);

        // 単語カード学習記録を作成
        card.setSuccessCount(0);
        card.setNextReviewDate(LocalDate.now());

        card = cardRepository.save(card);
        return CardDTO.fromEntity(card);
    }

    public CardDTO update(CardInput input) {
        Card card = findCardById(input.getCardId());

        // カード情報を属性ごとに作成
        List<CardValue> cardValues = getCardValue(card, input);

        // NG例（新しいリストをセットする）
        // card.setCardValues(newCardValues);
        // OK例（既存リストをクリアしてから追加）
        card.getCardValues().clear();
        card.getCardValues().addAll(cardValues);

        card = cardRepository.save(card);
        return CardDTO.fromEntity(card);
    }

    /**
     * カード情報を属性ごとに作成する関数
     * @param input
     * @return
     */
    private List<CardValue> getCardValue(Card card, CardInput input) {
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
        return cardValues;
    }

    /**
     * 今日復習するカード一覧取得
     * @param deckId デッキID
     * @return 復習カード一覧
     */
    public List<CardDTO> findDueCards(int deckId) {
        return cardRepository.findDueCards(deckId, LocalDate.now())
                .stream()
                .map(CardDTO::fromEntity)
                .toList();
    }

    /**
     * 問題に正解した時の処理
     * 次の出題日を決め、成功カウントを増やす
     * @param id 復習記録ID
     */
    public void success(int id) {
        Card card = findCardById(id);
        int count = card.getSuccessCount();
        card.setNextReviewDate(calcNextReviewDate(count));
        card.setSuccessCount(++count);

        cardRepository.save(card);
    }

    /**
     * 不正解の場合、正解記録をリセット
     * @param id 復習記録ID
     */
    public void failure(int id) {
        Card card = findCardById(id);
        card.setNextReviewDate(LocalDate.now());
        card.setSuccessCount(0);

        cardRepository.save(card);
    }

    private Card findCardById(int id) {
        return cardRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Card Not Found"));
    }

    /**
     * 成功回数に応じて次の出題日を設定
     * @param count 成功カウント
     * @return 次の出題日
     */
    private LocalDate calcNextReviewDate(int count) {
        return LocalDate.now().plusDays(count * 2L + 1);
    }

    public void deleteById(int id) {
        cardRepository.deleteById(id);
    }
}
