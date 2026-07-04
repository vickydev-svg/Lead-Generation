package com.leadforge.leadforge.repository;

import com.leadforge.leadforge.entity.Search;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface SearchRepository extends JpaRepository<Search, UUID> {
    List<Search> findByUserId(UUID userId);
}
