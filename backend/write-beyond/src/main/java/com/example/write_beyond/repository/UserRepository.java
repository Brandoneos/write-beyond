package com.example.write_beyond.repository;

import com.example.write_beyond.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    boolean existsByUsername(String username);

    @Query("SELECT u.role = 1 FROM User u WHERE u.id = :userId")
    Boolean isAdmin(@Param("userId") Long userId);
}