package com.example.write_beyond.controller;

import com.example.write_beyond.model.File;
import com.example.write_beyond.repository.FileRepository;
import com.example.write_beyond.repository.UserRepository;
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
    private final UserRepository userRepository;
    public FileController(FileRepository fileRepository, UserRepository userRepository) {
        this.fileRepository = fileRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("/files")
    public List<File> getFiles(@RequestHeader("User-Id") Long userId) {
        boolean isAdmin = userRepository.isAdmin(userId); // You need to implement this
//        boolean isAdmin = false;
        if (isAdmin) {
            return fileRepository.findAll();
        } else {
            return fileRepository.findByUserId(userId);
        }
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
