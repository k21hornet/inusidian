package com.chihuahuawashawasha.inusidian.mapper;

import com.chihuahuawashawasha.inusidian.model.dto.DeckDTO;
import com.chihuahuawashawasha.inusidian.model.entity.Deck;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {CardMapper.class, CardFieldMapper.class})
public interface DeckMapper {

    @Mapping(target = "cards", ignore = true)
    DeckDTO toDTOWithoutCardList(Deck deck);
}
