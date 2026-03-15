package com.chihuahuawashawasha.inusidian.reminder.service;

import com.chihuahuawashawasha.inusidian.entity.User;
import com.chihuahuawashawasha.inusidian.reminder.email.SendGridEmailService;
import com.chihuahuawashawasha.inusidian.repository.CardLogRepository;
import com.chihuahuawashawasha.inusidian.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ReminderService {

    private static final ZoneId ZONE_JST = ZoneId.of("Asia/Tokyo");

    private final UserRepository userRepository;
    private final CardLogRepository cardLogRepository;
    private final SendGridEmailService emailService;

    public void sendReminders() {
        LocalDate today = LocalDate.now(ZONE_JST);
        LocalDate yesterday = today.minusDays(1);
        LocalDate dayBeforeYesterday = today.minusDays(2);

        List<User> users = userRepository.findAll();
        log.info("対象ユーザー数: {}", users.size());

        for (User user : users) {
            try {
                boolean studiedToday = cardLogRepository.countByUserAndDate(user.getId(), today) > 0;
                boolean studiedYesterday = cardLogRepository.countByUserAndDate(user.getId(), yesterday) > 0;
                boolean studiedDayBefore = cardLogRepository.countByUserAndDate(user.getId(), dayBeforeYesterday) > 0;

                if (!studiedToday && studiedYesterday && studiedDayBefore) {
                    log.info("リマインド送信対象: userId={}, email={}", user.getId(), user.getEmail());
                    emailService.sendReminderEmail(user.getEmail(), user.getUserName());
                }
            } catch (Exception e) {
                log.error("ユーザーの処理中にエラーが発生しました: userId={}", user.getId(), e);
            }
        }
    }
}
