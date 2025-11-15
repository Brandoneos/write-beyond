package com.example.write_beyond.controller;

import com.example.write_beyond.dto.FileDto;
import com.example.write_beyond.model.File;
import com.example.write_beyond.repository.FileRepository;
import com.example.write_beyond.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

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
    public Page<FileDto> getFiles(
            @RequestHeader("User-Id") Long userId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "25") int size) {

        Sort sort = Sort.by(Sort.Direction.DESC, "dateCreated");

        Pageable pageable = PageRequest.of(page, size, sort);

        boolean isAdmin = userRepository.isAdmin(userId); // your existing method

        Page<File> pageResult = isAdmin
                ? fileRepository.findAll(pageable)
                : fileRepository.findByUserId(userId, pageable);

        return pageResult.map(FileDto::from);
    }

    @PostMapping("/files")
    public File createFile(@RequestBody File file) {
        // This saves the file to PostgreSQL
        file.setDateCreated(LocalDateTime.now());
        file.setDateModified(LocalDateTime.now());
        return fileRepository.save(file);
    }
    @GetMapping("/files/{id}/content")
    public ResponseEntity<String> getFileContent(@PathVariable Long id) {
        File file = (File) fileRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        return ResponseEntity.ok(file.getContent());
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
//    @PutMapping("/{id}")
//    public ResponseEntity<Void> updateFile(@PathVariable Long id,
//                                       @RequestBody UpdateFileRequest req,
//                                       @RequestHeader("User-Id") Long userId) {
////        fileService.update(id, userId, req.title(), req.content());
//        File file = (File) fileRepository.findByIdAndUserId(id, userId)
//                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
//        file.setContent(req);
//        return ResponseEntity.ok().build();
//    }


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
