package com.chihuahuawashawasha.inusidian.mapper;

import com.chihuahuawashawasha.inusidian.model.dto.DeckDTO;
import com.chihuahuawashawasha.inusidian.model.response.DecksResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface DecksResponseMapper {

    default DecksResponse toResponse(List<DecksResponse.DeckListItem> decks) {
        return new DecksResponse(decks);
    }

    @Mapping(target = "cardCount", expression = "java(dto.getCards().size())")
    @Mapping(target = "dueCardCount", source = "dueCardCount")
    DecksResponse.DeckListItem toResponse(DeckDTO dto, int dueCardCount);
}
