package com.leadforge.leadforge.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "businesses")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Business {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "search_id")
    private UUID searchId;

    @Column(nullable = false)
    private String name;

    private String category;

    private String address;

    private String phone;

    private String website;

    @Column(name = "google_rating")
    private Double googleRating;

    @Column(name = "review_count")
    private Integer reviewCount;

    @Column(name = "google_maps_url")
    private String googleMapsUrl;

    private Double latitude;

    private Double longitude;

    private String status;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private OffsetDateTime createdAt;
}
