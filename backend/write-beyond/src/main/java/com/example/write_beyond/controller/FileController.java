package com.example.write_beyond.controller;

import com.example.write_beyond.model.File;
import com.example.write_beyond.repository.FileRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

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
        file.setDateCreated(LocalDateTime.now());
        file.setDateModified(LocalDateTime.now());
        return fileRepository.save(file);
    }
    @PutMapping("/files/{id}")
    public ResponseEntity<File> updateFile(@PathVariable Long id, @RequestBody File updatedFile) {
        return fileRepository.findById(id)
                .map(file -> {
                    file.setName(updatedFile.getName());
                    file.setContent(updatedFile.getContent());
                    file.setDateModified(LocalDateTime.now());
                    File savedFile = fileRepository.save(file);
                    return ResponseEntity.ok(savedFile);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }


    @DeleteMapping("/files/{id}")
    public ResponseEntity<Void> deleteFile(@PathVariable Long id) {
        Optional<File> file = fileRepository.findById(id);

        if (file.isPresent()) {
            fileRepository.delete(file.get());
            return ResponseEntity.noContent().build(); // 204 No Content
        } else {
            return ResponseEntity.notFound().build(); // 404 Not Found
        }
    }
}
