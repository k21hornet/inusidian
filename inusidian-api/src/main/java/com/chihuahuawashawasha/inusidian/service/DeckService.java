package com.chihuahuawashawasha.inusidian.service;

import com.chihuahuawashawasha.inusidian.mapper.DeckMapper;
import com.chihuahuawashawasha.inusidian.model.dto.DeckDTO;
import com.chihuahuawashawasha.inusidian.model.dto.DeckIoDTO;
import com.chihuahuawashawasha.inusidian.model.entity.*;
import com.chihuahuawashawasha.inusidian.model.request.CardFieldInput;
import com.chihuahuawashawasha.inusidian.model.request.DeckInput;
import com.chihuahuawashawasha.inusidian.repository.*;
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

    private final CardFieldRepository cardFieldRepository;

    private final CardValueRepository cardValueRepository;

    private final CardLogRepository cardLogRepository;

    private final DeckMapper deckMapper;

    /**
     * デッキ一覧取得
     * @param authId authId
     * @return デッキ一覧
     */
    public List<DeckDTO> findAll(String authId) {
        return deckRepository.findAllByUserId(authId)
                .stream()
                .map(deckMapper::toDTO)
                .toList();
    }

    /**
     * デッキ詳細
     * @param auth0Id auth0Id
     * @param id デッキID
     * @return デッキ詳細
     */
    public DeckDTO findById(String auth0Id, int id) {
        return deckMapper.toDTO(deckRepository.find(auth0Id, id));
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

    /**
     * デッキ情報とカードをエクスポート
     */
    public DeckIoDTO exportDeck(String auth0Id, int deckId) {
        Deck deck = findDeckById(deckId);
        if (!auth0Id.equals(deck.getUser().getId())) {
            throw new RuntimeException("UserIdが一致しません");
        }

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
                                    .fieldName(cardValue.getField().getFieldName())
                                    .content(cardValue.getContent())
                                    .build())
                            .toList();

                    // 学習記録
                    List<DeckIoDTO.CardLogData> cardLogs = card.getCardLogs().stream()
                            .map(log -> DeckIoDTO.CardLogData.builder()
                                    .elapsedTime(log.getElapsedTime())
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
    public DeckDTO importDeck(String auth0Id, DeckIoDTO importData) {
        User user = userRepository.findById(auth0Id).orElseThrow();

        // デッキの基本情報を作成
        Deck deck = new Deck();
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
                cardValue.setCard(card);
                cardValue.setField(field);
                cardValue.setContent(fieldValue.getContent());
                cardValues.add(cardValue);
            }
            card.setCardValues(cardValues);

            // 学習記録を作成
            List<CardLog> cardLogs = new ArrayList<>();
            for (DeckIoDTO.CardLogData logData : cardData.getCardLogs()) {
                CardLog cardLog = new CardLog();
                cardLog.setCard(card);
                cardLog.setElapsedTime(logData.getElapsedTime());
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

        // カード値を保存
        for (Card card : cards) {
            for (CardValue cardValue : card.getCardValues()) {
                cardValueRepository.save(cardValue);
            }
            for (CardLog cardLog : card.getCardLogs()) {
                cardLogRepository.save(cardLog);
            }
        }

        return DeckDTO.fromEntity(deck);
    }
}
