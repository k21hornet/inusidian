package com.chihuahuawashawasha.inusidian.mapper;

import com.chihuahuawashawasha.inusidian.model.dto.UserDTO;
import com.chihuahuawashawasha.inusidian.model.entity.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserDTO toDTO(User user);
}
