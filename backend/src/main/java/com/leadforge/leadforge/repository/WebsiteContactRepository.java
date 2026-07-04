package com.leadforge.leadforge.repository;

import com.leadforge.leadforge.entity.WebsiteContact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface WebsiteContactRepository extends JpaRepository<WebsiteContact, UUID> {
    Optional<WebsiteContact> findByBusinessId(UUID businessId);
}
