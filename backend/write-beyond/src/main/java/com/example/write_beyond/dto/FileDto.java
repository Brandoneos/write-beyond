package com.example.write_beyond.dto;

import com.example.write_beyond.model.File;

import java.time.LocalDateTime;

public record FileDto(
        Long id,
        String title,
        LocalDateTime dateCreated,
        LocalDateTime dateModified
) {
    public static FileDto from(File f) {
        return new FileDto(
                f.getId(),
                f.getName(),
                f.getDateCreated(),
                f.getDateModified()
        );
    }
}