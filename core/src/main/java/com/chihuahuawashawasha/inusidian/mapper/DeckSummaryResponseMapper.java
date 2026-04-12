package com.chihuahuawashawasha.inusidian.mapper;

import com.chihuahuawashawasha.inusidian.dto.response.DeckSummaryResponse;
import com.chihuahuawashawasha.inusidian.entity.Deck;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface DeckSummaryResponseMapper {

    @Mapping(target = "cardCount", expression = "java(deck.getCards().size())")
    @Mapping(target = "dueCardCount", ignore = true)
    DeckSummaryResponse toResponse(Deck deck);
}
