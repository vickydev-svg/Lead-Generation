package com.leadforge.leadforge.repository;

import com.leadforge.leadforge.entity.LeadListItem;
import com.leadforge.leadforge.entity.LeadListItemId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface LeadListItemRepository extends JpaRepository<LeadListItem, LeadListItemId> {
    List<LeadListItem> findByIdLeadListId(UUID leadListId);
}
