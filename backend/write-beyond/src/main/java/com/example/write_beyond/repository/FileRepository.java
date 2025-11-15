package com.example.write_beyond.repository;

import com.example.write_beyond.model.File;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
//import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
//import org.springframework.data.domain.PageRequest;
//import org.springframework.data.domain.Sort;
import java.util.List;
import java.util.Optional;

@Repository
public interface FileRepository extends JpaRepository<File, Long> {
    Page<File> findByUserId(Long userId, Pageable pageable);

    // optional – for admins
    Page<File> findAll(Pageable pageable);

    Optional<Object> findByIdAndUserId(Long id, Long userId);
}