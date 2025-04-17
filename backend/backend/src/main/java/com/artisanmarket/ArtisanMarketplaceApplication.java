package com.artisanmarket;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class ArtisanMarketplaceApplication {

	public static void main(String[] args) {

		Dotenv dotenv = Dotenv.configure().load();
		System.setProperty("JWT_SECRET", dotenv.get("JWT_SECRET"));
		System.setProperty("JWT_EXPIRATION_MS", dotenv.get("JWT_EXPIRATION_MS"));

		SpringApplication.run(ArtisanMarketplaceApplication.class, args);
	}

}
