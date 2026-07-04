package com.leadforge.leadforge.repository;

import com.leadforge.leadforge.entity.WebsiteSocial;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface WebsiteSocialRepository extends JpaRepository<WebsiteSocial, UUID> {
    Optional<WebsiteSocial> findByBusinessId(UUID businessId);
}
