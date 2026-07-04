package com.leadforge.leadforge.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "exports")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Export {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @Column(nullable = false)
    private String filename;

    @Column(nullable = false)
    private String format; // 'CSV', 'Excel'

    @Column(name = "records_count")
    @Builder.Default
    private int recordsCount = 0;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private OffsetDateTime createdAt;
}
