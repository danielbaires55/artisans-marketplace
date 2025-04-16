package com.artisanmarket.service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.artisanmarket.model.Product;
import com.artisanmarket.repository.ProductRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class ProductService {
    
    private static final Logger logger = LoggerFactory.getLogger(ProductService.class);
    
    @Autowired
    private ProductRepository productRepository;

    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public List<Product> getProductsByArtisan(Long artisanId) {
        return productRepository.findByArtisanId(artisanId);
    }

    public List<Product> searchProductsByName(String name) {
        return productRepository.findByNameContainingIgnoreCase(name);
    }

    public List<Product> getProductsByCategory(Long categoryId) {
        return productRepository.findByCategoriesId(categoryId);
    }

    public Product updateProduct(Long id, Product productDetails) {
        Product product = productRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Product not found"));

        product.setName(productDetails.getName());
        product.setDescription(productDetails.getDescription());
        product.setPrice(productDetails.getPrice());
        product.setStockQuantity(productDetails.getStockQuantity());
        product.setImg(productDetails.getImg());
        if (productDetails.getCategories() != null) {
            product.setCategories(productDetails.getCategories());
        }

        return productRepository.save(product);
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    public boolean updateStock(Long productId, int quantity) {
        Product product = productRepository.findById(productId)
            .orElseThrow(() -> new RuntimeException("Product not found"));
        
        if (product.getStockQuantity() < quantity) {
            return false;
        }

        product.setStockQuantity(product.getStockQuantity() - quantity);
        productRepository.save(product);
        return true;
    }

    public Product updateProductImage(Long id, MultipartFile image) throws IOException {
        logger.info("Updating image for product ID: {}", id);
        Product product = productRepository.findById(id)
            .orElseThrow(() -> {
                logger.error("Product not found with ID: {}", id);
                return new RuntimeException("Product not found");
            });

        product.setImg(image.getBytes());
        logger.info("Image updated for product ID: {}, new size: {} bytes", id, image.getSize());
        return productRepository.save(product);
    }

    public byte[] getProductImage(Long id) {
        logger.info("Retrieving image for product ID: {}", id);
        Product product = productRepository.findById(id)
            .orElseThrow(() -> {
                logger.error("Product not found with ID: {}", id);
                return new RuntimeException("Product not found");
            });
        
        byte[] image = product.getImg();
        if (image == null || image.length == 0) {
            logger.warn("No image found for product ID: {}", id);
            return null;
        }
        
        logger.info("Image found for product ID: {}, size: {} bytes", id, image.length);
        return image;
    }
} 