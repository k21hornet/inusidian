package com.chihuahuawashawasha.inusidian.user.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.persistence.autoconfigure.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackages = "com.chihuahuawashawasha.inusidian")
@EntityScan(basePackages = "com.chihuahuawashawasha.inusidian")
@EnableJpaRepositories(basePackages = "com.chihuahuawashawasha.inusidian")
public class InusidianApplication {

	public static void main(String[] args) {
		SpringApplication.run(InusidianApplication.class, args);
	}

}
