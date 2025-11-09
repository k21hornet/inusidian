package com.chihuahuawashawasha.inusidian.mapper;

import com.chihuahuawashawasha.inusidian.model.dto.CardFieldDTO;
import com.chihuahuawashawasha.inusidian.model.entity.CardField;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CardFieldMapper {

    CardFieldDTO toDTO(CardField field);
}
