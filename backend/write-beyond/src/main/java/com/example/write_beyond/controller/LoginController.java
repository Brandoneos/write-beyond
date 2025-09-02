package com.example.write_beyond.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {
    @RequestMapping
    public String loginScreen() {
        return "Login Screen Initial";
    }
    @RequestMapping("/goodbye")
    public String goodbye() {
        return "Goodbye from Spring Boot";
    }

    @RequestMapping("/login")
    public String loginFunction() {
        return "Login Screen Here";
    }



}