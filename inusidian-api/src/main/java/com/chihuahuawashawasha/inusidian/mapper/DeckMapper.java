package com.chihuahuawashawasha.inusidian.mapper;

import com.chihuahuawashawasha.inusidian.model.dto.DeckDTO;
import com.chihuahuawashawasha.inusidian.model.entity.Deck;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {CardMapper.class, CardFieldMapper.class})
public interface DeckMapper {

    DeckDTO toDTO(Deck deck);
}
