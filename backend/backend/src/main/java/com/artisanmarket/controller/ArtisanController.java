package com.artisanmarket.controller;

import java.util.List;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.artisanmarket.model.Artisan;
import com.artisanmarket.service.ArtisanService;

@RestController
@RequestMapping("/api/artisans")
@CrossOrigin(origins = "http://localhost:5173")
public class ArtisanController {
    
    @Autowired
    private ArtisanService artisanService;

    @PostMapping
    public ResponseEntity<Artisan> createArtisan(@RequestBody Artisan artisan) {
        return ResponseEntity.ok(artisanService.createArtisan(artisan));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Artisan> getArtisanById(@PathVariable Long id) {
        return artisanService.getArtisanById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<Artisan>> getAllArtisans() {
        return ResponseEntity.ok(artisanService.getAllArtisans());
    }

    @GetMapping("/search/location")
    public ResponseEntity<List<Artisan>> searchArtisansByLocation(@RequestParam String location) {
        return ResponseEntity.ok(artisanService.searchArtisansByLocation(location));
    }

    @GetMapping("/search/name")
    public ResponseEntity<List<Artisan>> searchArtisansByName(@RequestParam String name) {
        return ResponseEntity.ok(artisanService.searchArtisansByName(name));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Artisan> updateArtisan(@PathVariable Long id, @RequestBody Artisan artisanDetails) {
        try {
            Artisan updatedArtisan = artisanService.updateArtisan(id, artisanDetails);
            return ResponseEntity.ok(updatedArtisan);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteArtisan(@PathVariable Long id) {
        artisanService.deleteArtisan(id);
        return ResponseEntity.ok().build();
    }
} 