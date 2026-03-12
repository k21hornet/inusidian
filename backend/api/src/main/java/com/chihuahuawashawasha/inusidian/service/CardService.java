package com.chihuahuawashawasha.inusidian.service;

import com.chihuahuawashawasha.inusidian.mapper.CardMapper;
import com.chihuahuawashawasha.inusidian.model.dto.CardDTO;
import com.chihuahuawashawasha.inusidian.model.entity.*;
import com.chihuahuawashawasha.inusidian.model.dto.CardRequest;
import com.chihuahuawashawasha.inusidian.model.dto.CardValueRequest;
import com.chihuahuawashawasha.inusidian.repository.*;
import com.chihuahuawashawasha.inusidian.util.ShortIdGenerator;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class CardService {

    private final CardRepository cardRepository;

    private final CardFieldRepository cardFieldRepository;

    private final DeckRepository deckRepository;

    private final CardLogRepository cardLogRepository;

    private final CardMapper cardMapper;

    /**
     * デッキに含まれるカード一覧を新しい順に取得
     *
     * @param deckId デッキID
     * @return カード一覧
     */
    public List<CardDTO> findCardListByDeck(String deckId) {
        return cardRepository.findCards(deckId).stream()
                .map(cardMapper::toDTO)
                .toList();
    }

    /**
     * カード詳細取得
     *
     * @param userId ユーザーID
     * @param id カードID
     * @return カード詳細
     */
    public CardDTO findById(String userId, String id) {
        return cardMapper.toDTO(cardRepository.find(userId, id)
                .orElseThrow(() -> new EntityNotFoundException("Card Not Found")));
    }

    /**
     * カード作成
     *
     * @param request
     * @return
     */
    public CardDTO create(CardRequest request) {
        // カードを作成
        Card card = new Card();
        card.setId(ShortIdGenerator.generateShortId(16));

        // 紐づくDeckを取得
        Deck deck = deckRepository.findById(request.getDeckId()).orElseThrow();
        card.setDeck(deck);

        // カード情報を属性ごとに作成
        Card finalCard = card;
        List<CardValue> cardValues = request.getValues().stream()
                .map(cvr -> {
                    // カード属性を取得
                    CardField field = cardFieldRepository.findById(cvr.getCardFieldId())
                            .orElseThrow(() -> new EntityNotFoundException("Field Not Found"));

                    CardValue cardValue = new CardValue();
                    CardValue.CardValueId id = new CardValue.CardValueId();
                    id.setCard(finalCard);
                    id.setField(field);
                    cardValue.setId(id);
                    cardValue.setContent(cvr.getContent());
                    return cardValue;
                }).toList();
        card.setCardValues(cardValues);

        // 単語カード学習記録を作成
        card.setSuccessCount(0);
        card.setReviewInterval(0);
        card.setNextReviewDate(LocalDate.now());

        card = cardRepository.save(card);
        return cardMapper.toDTO(card);
    }

    /**
     * カード更新
     * @param request
     * @return
     */
    public CardDTO update(CardRequest request) {
        Card card = cardRepository.findById(request.getCardId())
                .orElseThrow(() -> new EntityNotFoundException("Card Not Found"));

        // リクエストから来た値で既存のCardValueを更新
        for (CardValueRequest cvr : request.getValues()) {
            card.getCardValues().stream()
                    .filter(cv -> cv.getId().getField().getId().equals(cvr.getCardFieldId()))
                    .findFirst()
                    .ifPresent(cv -> cv.setContent(cvr.getContent()));
        }

        Card updatedCard = cardRepository.save(card);
        return cardMapper.toDTO(updatedCard);
    }

    /**
     * 今日復習するカード一覧取得
     * @param deckId デッキID
     * @return 復習カード一覧
     */
    public List<CardDTO> findDueCards(String deckId) {
        return cardRepository.findDueCards(deckId, LocalDate.now())
                .stream()
                .map(cardMapper::toDTO)
                .toList();
    }

    /**
     * 問題に正解した時の処理
     * 次の出題日を決め、成功カウントを増やす
     * @param id 復習記録ID
     * @param answerTime 回答時間
     */
    public void success(String id, Double answerTime) {
        Card card = cardRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Card Not Found"));
        int count = card.getSuccessCount();
        card.setSuccessCount(++count);
        // 復習間隔を設定
        int nextReviewInterval = calcNextReviewInterval(count, card.getReviewInterval(), answerTime);
        card.setReviewInterval(nextReviewInterval);
        // 次回復習日を設定
        card.setNextReviewDate(LocalDate.now().plusDays(nextReviewInterval));

        cardRepository.save(card);

        CardLog log = new CardLog();
        log.setCard(card);
        log.setAnswerTime(answerTime);
        log.setNextReviewInterval(nextReviewInterval);
        cardLogRepository.save(log);
    }

    /**
     * 不正解の場合、正解記録をリセット
     * @param id 復習記録ID
     */
    public void failure(String id, Double answerTime) {
        Card card = cardRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Card Not Found"));
        card.setSuccessCount(0);
        card.setReviewInterval(0);
        card.setNextReviewDate(LocalDate.now());

        cardRepository.save(card);

        CardLog log = new CardLog();
        log.setCard(card);
        log.setAnswerTime(answerTime);
        log.setNextReviewInterval(0);
        cardLogRepository.save(log);
    }

    /**
     * 復習間隔を計算
     * 復習間隔 = (2 x 成功カウント - 1 + 現復習間隔) x 難易度
     * @param count 成功カウント
     * @param reviewInterval 現在の復習間隔
     * @param answerTime 回答時間
     * @return 復習間隔
     */
    private int calcNextReviewInterval(int count, int reviewInterval, Double answerTime) {
        double difficulty = calcDifficulty(answerTime);
        return (int) Math.round((2 * count -1 + reviewInterval) * difficulty);
    }

    /**
     * 回答時間によって難易度を計算
     * @param answerTime 回答時間
     * @return 難易度
     */
    private double calcDifficulty(Double answerTime) {
        if (answerTime < 5) return 1.0;
        if (answerTime < 10) return 0.9;
        if (answerTime < 15) return 0.8;
        return 0.7;
    }

    public void deleteById(String id) {
        cardRepository.deleteById(id);
    }

    public String findNextCardId(String deckId, String currentId) {
        List<String> idList = cardRepository.findIdByDeckId(deckId);
        for (int i =1 ; i < idList.size() ; i++) {
            if (idList.get(i).equals(currentId)) return idList.get(i-1);
        }
        return "";
    }

    public String findPrevCardId(String deckId, String currentId) {
        List<String> idList = cardRepository.findIdByDeckId(deckId);
        for (int i =0 ; i < idList.size() - 1; i++) {
            if (idList.get(i).equals(currentId)) return idList.get(i+1);
        }
        return "";
    }
}
