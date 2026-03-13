package com.chihuahuawashawasha.inusidian.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CardFieldDTO {

    private Integer id;
    
    private String fieldName;
    
    private String fieldType;
    
    private LocalDateTime createdAt;
    
    private LocalDateTime updatedAt;
} 