package com.artisanmarket.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.Authentication;

import com.artisanmarket.model.User;
import com.artisanmarket.security.services.UserDetailsImpl;
import com.artisanmarket.service.UserService;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "*", methods = {
        RequestMethod.GET,
        RequestMethod.POST,
        RequestMethod.PUT,
        RequestMethod.DELETE,
        RequestMethod.OPTIONS,
        RequestMethod.HEAD,
        RequestMethod.PATCH
}, allowCredentials = "true", maxAge = 3600)
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        logger.info("Received registration request");
        logger.debug("Registration details: {}", user);

        try {
            if (user == null) {
                logger.error("Registration failed: user data is null");
                return ResponseEntity.badRequest().body("User data cannot be null");
            }

            if (user.getEmail() == null || user.getEmail().trim().isEmpty()) {
                logger.error("Registration failed: email is missing");
                return ResponseEntity.badRequest().body("Email is required");
            }

            logger.info("Processing registration for email: {}", user.getEmail());
            User registeredUser = userService.createUser(user);
            logger.info("Registration successful for user ID: {}", registeredUser.getId());

            return ResponseEntity.ok(registeredUser);
        } catch (Exception e) {
            logger.error("Registration failed with error: {}", e.getMessage(), e);
            return ResponseEntity.badRequest().body("Registration failed: " + e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        return ResponseEntity.ok(userService.createUser(user));
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return userService.getUserById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<User> getUserByEmail(@PathVariable String email) {
        return userService.getUserByEmail(email)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User userDetails) {
        try {
            User updatedUser = userService.updateUser(id, userDetails);
            return ResponseEntity.ok(updatedUser);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginRequest) {
        logger.info("Received login request for email: {}", loginRequest.getEmail());

        try {
            User user = userService.authenticateUser(loginRequest.getEmail(), loginRequest.getPassword());
            if (user != null) {
                logger.info("Login successful for user: {}", user.getEmail());
                return ResponseEntity.ok(user);
            } else {
                logger.error("Login failed: invalid credentials for email: {}", loginRequest.getEmail());
                return ResponseEntity.status(401).body("Credenziali non valide");
            }
        } catch (Exception e) {
            logger.error("Login error: {}", e.getMessage());
            return ResponseEntity.badRequest().body("Errore durante il login: " + e.getMessage());
        }
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser() {
        // TODO: Implementare la logica per ottenere l'utente corrente dal contesto di
        // sicurezza
        // Per ora restituiamo un errore 501 Not Implemented
        return ResponseEntity.status(501).body("Funzionalità non ancora implementata");
    }

    @PutMapping("/me")
    public ResponseEntity<?> updateUserProfile(@RequestBody User updatedUser, Authentication authentication) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        User user = userService.updateUser(userDetails.getId(), updatedUser);
        return ResponseEntity.ok(user);
    }
}