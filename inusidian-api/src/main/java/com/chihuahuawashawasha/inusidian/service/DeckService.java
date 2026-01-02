package com.chihuahuawashawasha.inusidian.service;

import com.chihuahuawashawasha.inusidian.mapper.DeckMapper;
import com.chihuahuawashawasha.inusidian.model.dto.*;
import com.chihuahuawashawasha.inusidian.model.entity.*;
import com.chihuahuawashawasha.inusidian.repository.*;
import com.chihuahuawashawasha.inusidian.util.ShortIdGenerator;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class DeckService {

    private final DeckRepository deckRepository;

    private final UserRepository userRepository;

    private final DeckMapper deckMapper;

    /**
     * デッキ一覧取得
     *
     * @param userId ユーザーID
     * @return デッキ一覧
     */
    public DeckListDTO findAll(String userId) {
        List<DeckListDTO.Deck> decks = deckRepository.findAllByUserIdOrderByCreatedAtDesc(userId)
                .stream()
                .map(deck -> DeckListDTO.Deck.builder()
                        .id(deck.getId())
                        .deckName(deck.getDeckName())
                        .deckDescription(deck.getDeckDescription())
                        .cardCount(deck.getCards().size())
                        .createdAt(deck.getCreatedAt())
                        .build())
                .toList();
        return DeckListDTO.builder().decks(decks).build();
    }

    /**
     * デッキ詳細
     *
     * @param userId userId
     * @param id デッキID
     * @return デッキ詳細
     */
    public DeckDTO findById(String userId, String id) {
        return deckMapper.toDTOWithoutCardList(deckRepository.find(userId, id)
                .orElseThrow(() -> new EntityNotFoundException("Deck Not Found")));
    }

    public DeckDTO create(String userId, DeckRequest request) {
        User user = userRepository.findById(userId).orElseThrow();

        // deckの基本情報を作成
        Deck deck = new Deck();
        deck.setId(ShortIdGenerator.generateShortId(12));
        deck.setUser(user);
        deck.setDeckName(request.getDeckName());
        deck.setDeckDescription(request.getDeckDescription());

        // deckのカード属性を作成
        Deck finalDeck = deck;
        List<CardField> cardFields = request.getCardFields().stream()
                .map(cfr -> {
                    CardField cardField = new CardField();
                    cardField.setDeck(finalDeck);
                    cardField.setFieldName(cfr.getFieldName());
                    cardField.setFieldType(cfr.getFieldType());
                    return cardField;
                }).toList();
        deck.setCardFields(cardFields);

        deck = deckRepository.save(deck);
        return deckMapper.toDTOWithoutCardList(deck);
    }

    public DeckDTO update(String userId, DeckRequest request) {
        String deckId = request.getDeckId();
        Deck deck = deckRepository.find(userId, deckId)
                .orElseThrow(() -> new EntityNotFoundException("Deck Not Found"));
        deck.setDeckName(request.getDeckName());
        deck.setDeckDescription(request.getDeckDescription());

        // カード属性をリクエストのものに更新
        for (CardFieldRequest cfr : request.getCardFields()) {
            deck.getCardFields().stream()
                    .filter(cf -> cf.getId().equals(cfr.getFieldId()))
                    .findFirst()
                    .ifPresent(cf -> cf.setFieldName(cfr.getFieldName()));
        }

        deck = deckRepository.save(deck);
        return deckMapper.toDTOWithoutCardList(deck);
    }

    public void deleteById(String id) {
        deckRepository.deleteById(id);
    }

    /**
     * デッキ情報とカードをエクスポート
     */
    public DeckIoDTO exportDeck(String userId, String deckId) {
        Deck deck = deckRepository.find(userId, deckId)
                .orElseThrow(() -> new EntityNotFoundException("Deck Not Found"));

        // デッキ情報
        DeckIoDTO.DeckInfo deckInfo = DeckIoDTO.DeckInfo.builder()
                .deckName(deck.getDeckName())
                .deckDescription(deck.getDeckDescription())
                .createdAt(deck.getCreatedAt())
                .updatedAt(deck.getUpdatedAt())
                .cardFields(deck.getCardFields().stream()
                        .map(field -> DeckIoDTO.CardFieldInfo.builder()
                                .fieldName(field.getFieldName())
                                .fieldType(field.getFieldType())
                                .build())
                        .toList())
                .build();

        // カード情報
        List<DeckIoDTO.CardData> cards = deck.getCards().stream()
                .map(card -> {
                    // フィールドに紐付く値
                    List<DeckIoDTO.CardFieldValue> fieldValues = card.getCardValues().stream()
                            .map(cardValue -> DeckIoDTO.CardFieldValue.builder()
                                    .fieldName(cardValue.getId().getField().getFieldName())
                                    .content(cardValue.getContent())
                                    .build())
                            .toList();

                    // 学習記録
                    List<DeckIoDTO.CardLogData> cardLogs = card.getCardLogs().stream()
                            .map(log -> DeckIoDTO.CardLogData.builder()
                                    .answerTime(log.getAnswerTime())
                                    .nextReviewInterval(log.getNextReviewInterval())
                                    .createdAt(log.getCreatedAt())
                                    .build())
                            .toList();

                    return DeckIoDTO.CardData.builder()
                            .successCount(card.getSuccessCount())
                            .reviewInterval(card.getReviewInterval())
                            .nextReviewDate(card.getNextReviewDate())
                            .cardCreatedAt(card.getCreatedAt())
                            .cardUpdatedAt(card.getUpdatedAt())
                            .fieldValues(fieldValues)
                            .cardLogs(cardLogs)
                            .build();
                })
                .toList();

        return DeckIoDTO.builder()
                .deckInfo(deckInfo)
                .cards(cards)
                .build();
    }

    /**
     * デッキとカードをインポート
     */
    public DeckDTO importDeck(String userId, DeckIoDTO importData) {
        User user = userRepository.findById(userId).orElseThrow();

        // デッキの基本情報を作成
        Deck deck = new Deck();
        deck.setId(ShortIdGenerator.generateShortId(12));
        deck.setUser(user);
        deck.setDeckName(importData.getDeckInfo().getDeckName());
        deck.setDeckDescription(importData.getDeckInfo().getDeckDescription());
        deck.setCreatedAt(importData.getDeckInfo().getCreatedAt());
        deck.setUpdatedAt(importData.getDeckInfo().getUpdatedAt());

        // カードフィールドを作成
        List<CardField> cardFields = new ArrayList<>();
        for (DeckIoDTO.CardFieldInfo fieldInfo : importData.getDeckInfo().getCardFields()) {
            CardField cardField = new CardField();
            cardField.setDeck(deck);
            cardField.setFieldName(fieldInfo.getFieldName());
            cardField.setFieldType(fieldInfo.getFieldType());
            cardFields.add(cardField);
        }
        deck.setCardFields(cardFields);

        // カードを作成
        List<Card> cards = new ArrayList<>();
        for (DeckIoDTO.CardData cardData : importData.getCards()) {
            Card card = new Card();
            card.setId(ShortIdGenerator.generateShortId(16));
            card.setDeck(deck);
            card.setSuccessCount(cardData.getSuccessCount() != null ? cardData.getSuccessCount() : 0);
            card.setReviewInterval(cardData.getReviewInterval() != null ? cardData.getReviewInterval() : 0);
            card.setNextReviewDate(cardData.getNextReviewDate() != null ? cardData.getNextReviewDate() : LocalDate.now());
            card.setCreatedAt(cardData.getCardCreatedAt());
            card.setUpdatedAt(cardData.getCardUpdatedAt());

            // カード値を作成
            List<CardValue> cardValues = new ArrayList<>();
            for (DeckIoDTO.CardFieldValue fieldValue : cardData.getFieldValues()) {
                // フィールド名からフィールドIDを取得
                CardField field = deck.getCardFields().stream()
                        .filter(f -> f.getFieldName().equals(fieldValue.getFieldName()))
                        .findFirst()
                        .orElseThrow(() -> new RuntimeException("フィールドが見つかりません: " + fieldValue.getFieldName()));

                CardValue cardValue = new CardValue();
                CardValue.CardValueId id = new CardValue.CardValueId();
                id.setCard(card);
                id.setField(field);
                cardValue.setId(id);
                cardValue.setContent(fieldValue.getContent());
                cardValues.add(cardValue);
            }
            card.setCardValues(cardValues);

            // 学習記録を作成
            List<CardLog> cardLogs = new ArrayList<>();
            for (DeckIoDTO.CardLogData logData : cardData.getCardLogs()) {
                CardLog cardLog = new CardLog();
                cardLog.setCard(card);
                cardLog.setAnswerTime(logData.getAnswerTime());
                cardLog.setNextReviewInterval(logData.getNextReviewInterval());
                cardLog.setCreatedAt(logData.getCreatedAt() != null ? logData.getCreatedAt() : LocalDateTime.now());
                cardLogs.add(cardLog);
            }
            card.setCardLogs(cardLogs);

            cards.add(card);
        }
        deck.setCards(cards);

        // デッキを保存
        deck = deckRepository.save(deck);

        return deckMapper.toDTOWithoutCardList(deck);
    }
}
