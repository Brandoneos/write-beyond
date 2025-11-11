package com.example.write_beyond.model;

//import jakarta.persistence.;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "app_user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique=true, nullable=false)
    private String username;

    @Column(nullable=false)
    private String password;

    private LocalDateTime registeredAt;

    @Column(nullable=false, columnDefinition = "integer default 0")
    private Integer role;


    public User() {}

    public Long getId() {
        return id;
    }
    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String encode) {
        this.password = encode;
    }

    public String getPassword() {
        return password;
    }
    public String getUsername() {
        return username;
    }

    public LocalDateTime getRegisteredAt() {
        return registeredAt;
    }

    public void setRegisteredAt(LocalDateTime registeredAt) {
        this.registeredAt = registeredAt;
    }


    public Integer getRole() {
        return role;
    }

    public void setRole(Integer role) {
        this.role = role;
    }
}