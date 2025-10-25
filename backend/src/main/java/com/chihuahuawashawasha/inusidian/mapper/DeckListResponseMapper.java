package com.chihuahuawashawasha.inusidian.mapper;

import com.chihuahuawashawasha.inusidian.model.entity.Deck;
import com.chihuahuawashawasha.inusidian.model.response.DeckListResponse;
import com.chihuahuawashawasha.inusidian.model.response.DeckListResponseItem;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface DeckListResponseMapper {

    default DeckListResponse toResponse(List<DeckListResponseItem> items) {
        DeckListResponse response = new DeckListResponse();
        response.setDeckListResponseItems(items);
        return response;
    }

    @Mapping(target = "cardCount", expression = "java(deck.getCards().size())")
    DeckListResponseItem toResponseItem(Deck deck, int dueCardCount);
}
