package com.chihuahuawashawasha.inusidian.model.dto;

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
}
