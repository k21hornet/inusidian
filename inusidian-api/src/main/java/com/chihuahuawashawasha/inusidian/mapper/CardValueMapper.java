package com.chihuahuawashawasha.inusidian.mapper;

import com.chihuahuawashawasha.inusidian.model.dto.CardValueDTO;
import com.chihuahuawashawasha.inusidian.model.entity.CardValue;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = CardFieldMapper.class)
public interface CardValueMapper {

    @Mapping(target = "field", source = "field")
    CardValueDTO toDTO(CardValue value);
}
