package com.chihuahuawashawasha.inusidian.model.dto;

import com.chihuahuawashawasha.inusidian.model.entity.CardValue;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CardValueDTO {

    private Integer id;

    private String fieldName;

    private String fieldType;

    private String content;

    public static CardValueDTO fromEntity(CardValue cv) {
        return new CardValueDTO(
                cv.getId(),
                cv.getField().getFieldName(),
                cv.getField().getFieldType(),
                cv.getContent()
        );
    }

} 