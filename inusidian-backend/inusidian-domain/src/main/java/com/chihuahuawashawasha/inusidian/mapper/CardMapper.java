package com.chihuahuawashawasha.inusidian.mapper;

import com.chihuahuawashawasha.inusidian.dto.CardDTO;
import com.chihuahuawashawasha.inusidian.entity.Card;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = CardValueMapper.class)
public interface CardMapper {

    @Mapping(target = "deckId", source = "card.deck.id")
    CardDTO toDTO(Card card);
}
