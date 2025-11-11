package com.example.write_beyond.controller;


import com.example.write_beyond.dto.LoginRequest;
import com.example.write_beyond.dto.RegisterRequest;
import com.example.write_beyond.model.User;
import com.example.write_beyond.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/auth")
public class AuthController {
    private final UserRepository userRepo;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public AuthController(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

//    private final AuthService authService;

//    public AuthController(AuthService authService) {
//        this.authService = authService;
//    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@RequestBody RegisterRequest request) {
//        System.out.println("Testing Register called");
        if(userRepo.existsByUsername(request.username())) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Username already exists"));
        }
        User user = new User();
        user.setUsername(request.username());
        user.setPassword(encoder.encode(request.password()));
        user.setRegisteredAt(LocalDateTime.now());
        user.setRole(0);
        userRepo.save(user);
        return ResponseEntity.status(201)
                .body(Map.of("message", "Registered successfully"));
//        return authService.register(request);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody LoginRequest req) {


        User user = userRepo.findByUsername(req.username()).orElse(null);

        if (user == null) {
            return ResponseEntity.status(401)
                    .body(Map.of(
                            "success", false,
                            "error", "User not found"
                    ));
        }

        boolean passwordCorrect = encoder.matches(req.password(), user.getPassword());

        if (!passwordCorrect) {
            return ResponseEntity.status(401)
                    .body(Map.of(
                            "success", false,
                            "error", "Invalid password"
                    ));
        }

        // SUCCESS
        return ResponseEntity.ok(Map.of(
                "success", true,
                "username", user.getUsername(),
                "id", user.getId()
        ));
    }
}
