package com.chihuahuawashawasha.inusidian.reminder;

import com.chihuahuawashawasha.inusidian.reminder.service.ReminderService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.ExitCodeGenerator;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class ReminderRunner implements CommandLineRunner, ExitCodeGenerator {

    private final ReminderService reminderService;
    private int exitCode = 0;

    @Override
    public void run(String... args) {
        try {
            log.info("リマインドバッチ開始");
            reminderService.sendReminders();
            log.info("リマインドバッチ完了");
        } catch (Exception e) {
            log.error("リマインドバッチでエラーが発生しました", e);
            exitCode = 1;
        }
    }

    @Override
    public int getExitCode() {
        return exitCode;
    }
}
