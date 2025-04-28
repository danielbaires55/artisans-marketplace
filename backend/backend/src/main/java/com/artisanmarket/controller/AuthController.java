package com.artisanmarket.controller;

import java.util.Date;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.artisanmarket.model.User;
import com.artisanmarket.payload.request.LoginRequest;
import com.artisanmarket.payload.request.SignupRequest;
import com.artisanmarket.payload.response.JwtResponse;
import com.artisanmarket.payload.response.MessageResponse;
import com.artisanmarket.repository.UserRepository;
import com.artisanmarket.security.jwt.JwtUtils;
import com.artisanmarket.security.services.UserDetailsImpl;

import jakarta.servlet.http.HttpServletRequest;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
  @Autowired
  AuthenticationManager authenticationManager;

  @Autowired
  UserRepository userRepository;

  @Autowired
  PasswordEncoder encoder;

  @Autowired
  JwtUtils jwtUtils;

  @PostMapping("/signin")
  public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

    Authentication authentication = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

    SecurityContextHolder.getContext().setAuthentication(authentication);
    String jwt = jwtUtils.generateJwtToken(authentication);

    UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

    return ResponseEntity.ok(new JwtResponse(jwt,
        userDetails.getId(),
        userDetails.getEmail(),
        userDetails.getFirstName(),
        userDetails.getLastName()));
  }

  @PostMapping("/signup")
  public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
    if (userRepository.existsByEmail(signUpRequest.getEmail())) {
      return ResponseEntity
          .badRequest()
          .body(new MessageResponse("Error: Email is already in use!"));
    }

    // Create new user's account
    User user = new User(
        signUpRequest.getEmail(),
        encoder.encode(signUpRequest.getPassword()),
        signUpRequest.getFirstName(),
        signUpRequest.getLastName(),
        signUpRequest.getAddress());

    user.setCreatedAt(new Date());

    userRepository.save(user);

    return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
  }

  @PostMapping("/logout")
  public ResponseEntity<?> logoutUser(HttpServletRequest request) {
    request.getSession().invalidate(); // Invalida la sessione
    return ResponseEntity.ok(new MessageResponse("Logout effettuato con successo!"));
  }

}