package com.chihuahuawashawasha.inusidian.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CardValueDTO {

    private CardFieldDTO field;

    private String content;
} 