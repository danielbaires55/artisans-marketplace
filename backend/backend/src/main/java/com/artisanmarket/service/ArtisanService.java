package com.artisanmarket.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.artisanmarket.model.Artisan;
import com.artisanmarket.repository.ArtisanRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class ArtisanService {
    
    @Autowired
    private ArtisanRepository artisanRepository;

    public Artisan createArtisan(Artisan artisan) {
        return artisanRepository.save(artisan);
    }

    public Optional<Artisan> getArtisanById(Long id) {
        return artisanRepository.findById(id);
    }

    public List<Artisan> getAllArtisans() {
        return artisanRepository.findAll();
    }

    public List<Artisan> searchArtisansByLocation(String location) {
        return artisanRepository.findByLocationContainingIgnoreCase(location);
    }

    public List<Artisan> searchArtisansByName(String name) {
        return artisanRepository.findByNameContainingIgnoreCase(name);
    }

    public Artisan updateArtisan(Long id, Artisan artisanDetails) {
        Artisan artisan = artisanRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Artisan not found"));

        artisan.setName(artisanDetails.getName());
        artisan.setDescription(artisanDetails.getDescription());
        artisan.setLocation(artisanDetails.getLocation());
        artisan.setProfileImage(artisanDetails.getProfileImage());

        return artisanRepository.save(artisan);
    }

    public void deleteArtisan(Long id) {
        artisanRepository.deleteById(id);
    }
} 