package com.artisanmarket.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.artisanmarket.model.Artisan;

@Repository
public interface ArtisanRepository extends JpaRepository<Artisan, Long> {
    List<Artisan> findByLocationContainingIgnoreCase(String location);
    List<Artisan> findByNameContainingIgnoreCase(String name);
} 