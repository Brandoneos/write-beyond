package com.example.write_beyond;  // use your package name

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                // allow React dev server to access Spring Boot APIs
                registry.addMapping("/")          // root endpoint
                        .allowedOrigins("http://localhost:3000");
                registry.addMapping("/goodbye")   // /goodbye endpoint
                        .allowedOrigins("http://localhost:3000");
            }
        };
    }
}
