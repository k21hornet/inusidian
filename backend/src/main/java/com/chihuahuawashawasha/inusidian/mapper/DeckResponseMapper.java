package com.chihuahuawashawasha.inusidian.mapper;

import com.chihuahuawashawasha.inusidian.model.entity.CardField;
import com.chihuahuawashawasha.inusidian.model.entity.CardValue;
import com.chihuahuawashawasha.inusidian.model.entity.Deck;
import com.chihuahuawashawasha.inusidian.model.response.DeckResponse;
import com.chihuahuawashawasha.inusidian.model.response.DeckResponseCardItem;
import com.chihuahuawashawasha.inusidian.model.response.DeckResponseFieldItem;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface DeckResponseMapper {

    default DeckResponse toResponse(Deck deck, List<DeckResponseCardItem> cardItems, List<DeckResponseFieldItem> fieldItems) {
        DeckResponse response = new DeckResponse();
        response.setId(deck.getId());
        response.setDeckName(deck.getDeckName());
        response.setDeckDescription(deck.getDeckDescription());
        response.setCards(cardItems);
        response.setCardFields(fieldItems);
        return response;
    }

    @Mapping(target = "id", source = "value.card.id")
    @Mapping(target = "primaryField", source = "value.field.fieldName")
    @Mapping(target = "primaryValue", source = "value.content")
    @Mapping(target = "successCount", source = "value.card.successCount")
    @Mapping(target = "reviewInterval", source = "value.card.reviewInterval")
    @Mapping(target = "nextReviewDate", source = "value.card.nextReviewDate")
    DeckResponseCardItem toResponseCardItem(CardValue value);

    DeckResponseFieldItem toResponseFieldItem(CardField field);
}
