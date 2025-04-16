package com.artisanmarket.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.artisanmarket.model.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByArtisanId(Long artisanId);
    List<Product> findByNameContainingIgnoreCase(String name);
    List<Product> findByCategoriesId(Long categoryId);
} 