package com.chihuahuawashawasha.inusidian.service;

import com.chihuahuawashawasha.inusidian.model.entity.User;
import com.chihuahuawashawasha.inusidian.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    /**
     * 初回ログイン時ユーザーをDBに保存
     * @param auth0Id ユーザーID
     * @param email メール
     */
    public void createUserIfNotExist(String auth0Id, String email) {
        Optional<User> optionalUser = userRepository.findById(auth0Id);
        if (optionalUser.isEmpty()) {
            User user = new User();
            user.setId(auth0Id);
            user.setEmail(email);
            user.setAuthority("USER");
            userRepository.save(user);
        }
    }
}
