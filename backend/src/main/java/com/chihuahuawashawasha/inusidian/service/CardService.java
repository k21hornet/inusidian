package com.chihuahuawashawasha.inusidian.service;

import com.chihuahuawashawasha.inusidian.mapper.CardMapper;
import com.chihuahuawashawasha.inusidian.model.dto.CardDTO;
import com.chihuahuawashawasha.inusidian.model.entity.*;
import com.chihuahuawashawasha.inusidian.model.request.CardInput;
import com.chihuahuawashawasha.inusidian.model.request.CardValueInput;
import com.chihuahuawashawasha.inusidian.repository.*;
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

    private final CardValueRepository cardValueRepository;

    private final CardLogRepository cardLogRepository;

    private final CardMapper cardMapper;

    public CardDTO findById(String auth0Id, int id) {
        return cardMapper.toDTO(cardRepository.find(auth0Id, id));
    }

    public CardDTO create(CardInput input) {
        // カードを作成
        Card card = new Card();

        // 紐づくDeckを取得
        Deck deck = deckRepository.findById(input.getDeckId()).orElseThrow();
        card.setDeck(deck);

        // カード情報を属性ごとに作成
        List<CardValue> cardValues = getCardValue(card, input);
        card.setCardValues(cardValues);

        // 単語カード学習記録を作成
        card.setSuccessCount(0);
        card.setReviewInterval(0);
        card.setNextReviewDate(LocalDate.now());

        card = cardRepository.save(card);
        return CardDTO.fromEntity(card);
    }

    public CardDTO update(CardInput input) {
        Card card = findCardById(input.getCardId());

        // カード情報を属性ごとに作成
        List<CardValue> cardValues = getCardValue(card, input);

        // 既存リストをクリアしてから追加
        for (CardValue cv : card.getCardValues()) {
            cardValueRepository.delete(cv);
        }
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
     * @param elapsedTime 回答時間
     */
    public void success(int id, int elapsedTime) {
        Card card = findCardById(id);
        int count = card.getSuccessCount();
        card.setSuccessCount(++count);
        // 復習間隔を設定
        int nextReviewInterval = calcNextReviewInterval(count, card.getReviewInterval(), elapsedTime);
        card.setReviewInterval(nextReviewInterval);
        // 次回復習日を設定
        card.setNextReviewDate(LocalDate.now().plusDays(nextReviewInterval));

        cardRepository.save(card);

        CardLog log = new CardLog();
        log.setCard(card);
        log.setElapsedTime(elapsedTime);
        log.setNextReviewInterval(nextReviewInterval);
        cardLogRepository.save(log);
    }

    /**
     * 不正解の場合、正解記録をリセット
     * @param id 復習記録ID
     */
    public void failure(int id) {
        Card card = findCardById(id);
        card.setSuccessCount(0);
        card.setReviewInterval(0);
        card.setNextReviewDate(LocalDate.now());

        cardRepository.save(card);

        CardLog log = new CardLog();
        log.setCard(card);
        log.setElapsedTime(-999);
        log.setNextReviewInterval(0);
        cardLogRepository.save(log);
    }

    private Card findCardById(int id) {
        return cardRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Card Not Found"));
    }

    /**
     * 復習間隔を計算
     * 復習間隔 = (2 x 成功カウント - 1 + 現復習間隔) x 難易度
     * @param count 成功カウント
     * @param reviewInterval 現在の復習間隔
     * @param elapsedTime 回答時間
     * @return 復習間隔
     */
    private int calcNextReviewInterval(int count, int reviewInterval, int elapsedTime) {
        double difficulty = calcDifficulty(elapsedTime);
        return (int) Math.round((2 * count -1 + reviewInterval) * difficulty);
    }

    /**
     * 回答時間によって難易度を計算
     * @param elapsedTime 回答時間
     * @return 難易度
     */
    private double calcDifficulty(int elapsedTime) {
        if (elapsedTime < 5) return 1.0;
        if (elapsedTime < 10) return 0.9;
        if (elapsedTime < 15) return 0.8;
        return 0.7;
    }

    public void deleteById(int id) {
        cardRepository.deleteById(id);
    }

    public int findNextCardId(int deckId, int currentId) {
        List<Integer> idList = cardRepository.findIdByDeckId(deckId);
        for (int i =0 ; i < idList.size() - 1; i++) {
            if (idList.get(i) == currentId) return idList.get(i+1);
        }
        return -999;
    }

    public int findPrevCardId(int deckId, int currentId) {
        List<Integer> idList = cardRepository.findIdByDeckId(deckId);
        for (int i =1 ; i < idList.size() ; i++) {
            if (idList.get(i) == currentId) return idList.get(i-1);
        }
        return -999;
    }
}
