package com.example.write_beyond.controller;

import com.example.write_beyond.model.File;
import com.example.write_beyond.repository.FileRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")  // allow React frontend
@RequestMapping("/api")
public class FileController {

    private final FileRepository fileRepository;

    public FileController(FileRepository fileRepository) {
        this.fileRepository = fileRepository;
    }

    @GetMapping("/files")
    public List<File> getAllFiles() {
        return fileRepository.findAll();
    }

    @PostMapping("/files")
    public File createFile(@RequestBody File file) {
        // This saves the file to PostgreSQL
        return fileRepository.save(file);
    }
}
