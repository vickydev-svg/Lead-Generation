package com.leadforge.leadforge.repository;

import com.leadforge.leadforge.entity.SearchJob;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface SearchJobRepository extends JpaRepository<SearchJob, UUID> {
    List<SearchJob> findByUserId(UUID userId);
    Optional<SearchJob> findBySearchId(UUID searchId);
}
