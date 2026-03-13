package com.chihuahuawashawasha.inusidian.service;

import com.chihuahuawashawasha.inusidian.mapper.UserMapper;
import com.chihuahuawashawasha.inusidian.model.dto.UserDTO;
import com.chihuahuawashawasha.inusidian.model.entity.User;
import com.chihuahuawashawasha.inusidian.repository.UserRepository;
import com.chihuahuawashawasha.inusidian.util.ShortIdGenerator;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    private final UserMapper userMapper;

    /**
     * 初回ログイン時ユーザーをDBに保存
     *
     * @param email メールアドレス
     */
    public void createUserIfNotExist(String email) {
        Optional<User> optional = userRepository.findByEmail(email);

        if (optional.isEmpty()) {
            User user = new User();
            String tmpUserName = ShortIdGenerator.generateShortId(12);
            user.setId(tmpUserName);
            user.setUserName(tmpUserName);
            user.setEmail(email);
            userRepository.save(user);
        }
    }

    /**
     * emailからユーザーを取得
     *
     * @param email メールアドレス
     * @return userDTO
     */
    public UserDTO findByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("User Not Found"));
        return userMapper.toDTO(user);
    }
}
