package com.example.write_beyond.model;

import java.time.LocalDateTime;

public class File {
    private Long id;          // unique identifier
    private String name;      // file name
    private String content;   // file content
    private LocalDateTime createdAt; // optional timestamp

    // ✅ Default constructor is required for JSON deserialization
    public File() {}

    // ✅ Full constructor
    public File(Long id, String name, String content, LocalDateTime createdAt) {
        this.id = id;
        this.name = name;
        this.content = content;
        this.createdAt = createdAt;
    }

    // ✅ Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
