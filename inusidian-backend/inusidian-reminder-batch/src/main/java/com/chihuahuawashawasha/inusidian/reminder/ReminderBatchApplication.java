package com.chihuahuawashawasha.inusidian.reminder;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {
        "com.chihuahuawashawasha.inusidian.reminder",
        "com.chihuahuawashawasha.inusidian.repository",
        "com.chihuahuawashawasha.inusidian.entity"
})
public class ReminderBatchApplication {

    public static void main(String[] args) {
        System.exit(SpringApplication.exit(SpringApplication.run(ReminderBatchApplication.class, args)));
    }
}
