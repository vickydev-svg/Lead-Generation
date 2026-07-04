package com.leadforge.leadforge.repository;

import com.leadforge.leadforge.entity.WebsiteAudit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface WebsiteAuditRepository extends JpaRepository<WebsiteAudit, UUID> {
    Optional<WebsiteAudit> findByBusinessId(UUID businessId);
}
