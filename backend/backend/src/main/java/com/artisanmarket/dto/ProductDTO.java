package com.artisanmarket.dto;

import java.math.BigDecimal;
import java.util.Base64;

import com.artisanmarket.model.Product;

public class ProductDTO {
    private Long id;
    private String name;
    private String description;
    private String details;
    private BigDecimal price;
    private Integer stockQuantity;
    private byte[] img;
    private String imageBase64;
    private ArtisanDTO artisan;

    public ProductDTO() {}

    public ProductDTO(Product product) {
        this.id = product.getId();
        this.name = product.getName();
        this.description = product.getDescription();
        this.details = product.getDetails();
        this.price = product.getPrice();
        this.stockQuantity = product.getStockQuantity();
        this.img = product.getImg();
        if (this.img != null) {
            this.imageBase64 = Base64.getEncoder().encodeToString(this.img);
        }
        if (product.getArtisan() != null) {
            this.artisan = new ArtisanDTO(product.getArtisan());
        }
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Integer getStockQuantity() {
        return stockQuantity;
    }

    public void setStockQuantity(Integer stockQuantity) {
        this.stockQuantity = stockQuantity;
    }

    public byte[] getImg() {
        return img;
    }

    public void setImg(byte[] img) {
        this.img = img;
        if (img != null) {
            this.imageBase64 = Base64.getEncoder().encodeToString(img);
        }
    }

    public String getImageBase64() {
        return imageBase64;
    }

    public void setImageBase64(String imageBase64) {
        this.imageBase64 = imageBase64;
        if (imageBase64 != null) {
            this.img = Base64.getDecoder().decode(imageBase64);
        }
    }

    public ArtisanDTO getArtisan() {
        return artisan;
    }

    public void setArtisan(ArtisanDTO artisan) {
        this.artisan = artisan;
    }
} 