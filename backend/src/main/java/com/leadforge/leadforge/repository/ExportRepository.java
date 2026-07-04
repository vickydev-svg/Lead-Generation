package com.leadforge.leadforge.repository;

import com.leadforge.leadforge.entity.Export;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ExportRepository extends JpaRepository<Export, UUID> {
    List<Export> findByUserId(UUID userId);
}
