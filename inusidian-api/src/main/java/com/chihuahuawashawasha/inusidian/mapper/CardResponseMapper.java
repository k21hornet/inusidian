package com.chihuahuawashawasha.inusidian.mapper;

import com.chihuahuawashawasha.inusidian.model.dto.CardDTO;
import com.chihuahuawashawasha.inusidian.model.response.CardResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CardResponseMapper {

    CardResponse toResponse(CardDTO dto);
}
