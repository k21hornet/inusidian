package com.chihuahuawashawasha.inusidian.mapper;

import com.chihuahuawashawasha.inusidian.model.dto.DeckDTO;
import com.chihuahuawashawasha.inusidian.model.response.DeckResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface DeckResponseMapper {

    DeckResponse toResponse(DeckDTO dto);
}
