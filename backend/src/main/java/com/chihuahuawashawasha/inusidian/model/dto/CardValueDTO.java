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

    private CardFieldDTO field;

    private String content;

    public static CardValueDTO fromEntity(CardValue cv) {
        return new CardValueDTO(
                cv.getId(),
                CardFieldDTO.fromEntity(cv.getField()),
                cv.getContent()
        );
    }

} 