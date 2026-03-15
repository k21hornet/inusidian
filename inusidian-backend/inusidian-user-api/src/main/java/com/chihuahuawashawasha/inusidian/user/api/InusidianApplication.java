package com.chihuahuawashawasha.inusidian.user.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.persistence.autoconfigure.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
@ComponentScan(basePackages = "com.chihuahuawashawasha.inusidian")
@EntityScan(basePackages = "com.chihuahuawashawasha.inusidian")
@EnableJpaRepositories(basePackages = "com.chihuahuawashawasha.inusidian")
public class InusidianApplication {

	public static void main(String[] args) {
		SpringApplication.run(InusidianApplication.class, args);
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**")
						.allowedOrigins("http://localhost:3000")
						.allowedMethods("GET", "POST", "PUT", "DELETE")
						.allowedHeaders("*") // すべてのヘッダーを許可
						.allowCredentials(true); // クッキーを使用するため
			}
		};
	}

}
