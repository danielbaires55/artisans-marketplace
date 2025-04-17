// package com.artisanmarket.config;

// import java.util.Arrays;
// import java.util.Collections;

// import org.slf4j.Logger;
// import org.slf4j.LoggerFactory;
// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
// import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
//  import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//  import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.security.web.SecurityFilterChain;
// import org.springframework.web.cors.CorsConfiguration;
// import org.springframework.web.cors.CorsConfigurationSource;
// import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

// @Configuration
// @EnableWebSecurity
// public class SecurityConfig {
    
//     private static final Logger logger = LoggerFactory.getLogger(SecurityConfig.class);

//      @Bean
//      public PasswordEncoder passwordEncoder() {
//          return new BCryptPasswordEncoder();
//      }

//     @Bean
//     public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//         logger.info("Configuring security chain...");
        
//         http
//             .cors(cors -> {
//                 logger.info("Setting up CORS configuration...");
//                 cors.configurationSource(corsConfigurationSource());
//             })
//             .csrf(AbstractHttpConfigurer::disable)
//             .authorizeHttpRequests(auth -> {
//                 logger.info("Configuring authorization...");
//                 auth
//                     .requestMatchers("/**").permitAll();
//             })
//             .headers(headers -> headers.frameOptions(frameOptions -> frameOptions.disable()));
        
//         logger.info("Security configuration completed");
//         return http.build();
//     }

//     @Bean
//     public CorsConfigurationSource corsConfigurationSource() {
//         logger.info("Creating CORS configuration...");
        
//         CorsConfiguration configuration = new CorsConfiguration();
//         configuration.setAllowedOriginPatterns(Collections.singletonList("http://localhost:5173"));
//         configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH", "HEAD"));
//         configuration.setAllowedHeaders(Arrays.asList("*"));
//         configuration.setAllowCredentials(true);
//         configuration.setExposedHeaders(Arrays.asList("Authorization"));
        
//         UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//         source.registerCorsConfiguration("/**", configuration);
        
//         logger.info("CORS configuration completed");
//         return source;
//     }
// } 