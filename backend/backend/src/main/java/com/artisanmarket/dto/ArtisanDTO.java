package com.artisanmarket.dto;

import com.artisanmarket.model.Artisan;

public class ArtisanDTO {
    private Long id;
    private String name;
    private String description;
    private String location;
    private String profileImage;

    public ArtisanDTO() {}

    public ArtisanDTO(Artisan artisan) {
        this.id = artisan.getId();
        this.name = artisan.getName();
        this.description = artisan.getDescription();
        this.location = artisan.getLocation();
        this.profileImage = artisan.getProfileImage();
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

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getProfileImage() {
        return profileImage;
    }

    public void setProfileImage(String profileImage) {
        this.profileImage = profileImage;
    }
} 