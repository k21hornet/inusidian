package com.chihuahuawashawasha.inusidian.model.dto;

import com.chihuahuawashawasha.inusidian.model.entity.CardField;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CardFieldDTO {

    private Integer id;
    
    private String fieldName;
    
    private String fieldType;
    
    private LocalDateTime createdAt;
    
    private LocalDateTime updatedAt;
    
    private LocalDateTime deletedAt;

    public static CardFieldDTO fromEntity(CardField field) {
        return new CardFieldDTO(
                field.getId(),
                field.getFieldName(),
                field.getFieldType(),
                field.getCreatedAt(),
                field.getUpdatedAt(),
                field.getDeletedAt()
        );
    }

} 