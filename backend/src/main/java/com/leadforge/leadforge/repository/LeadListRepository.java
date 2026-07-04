package com.leadforge.leadforge.repository;

import com.leadforge.leadforge.entity.LeadList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface LeadListRepository extends JpaRepository<LeadList, UUID> {
    List<LeadList> findByProjectId(UUID projectId);
}
