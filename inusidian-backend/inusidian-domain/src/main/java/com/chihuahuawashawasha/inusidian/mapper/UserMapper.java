package com.chihuahuawashawasha.inusidian.mapper;

import com.chihuahuawashawasha.inusidian.dto.UserDTO;
import com.chihuahuawashawasha.inusidian.entity.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserDTO toDTO(User user);
}
