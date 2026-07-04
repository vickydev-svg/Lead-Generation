package com.leadforge.leadforge.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "searches")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Search {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @Column(nullable = false)
    private String keyword;

    @Column(nullable = false)
    private String location;

    private Integer radius;

    @Column(name = "max_results")
    private Integer maxResults;

    @Column(name = "leads_found")
    @Builder.Default
    private int leadsFound = 0;

    @Column(name = "credits_spent")
    @Builder.Default
    private int creditsSpent = 0;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private OffsetDateTime createdAt;
}
