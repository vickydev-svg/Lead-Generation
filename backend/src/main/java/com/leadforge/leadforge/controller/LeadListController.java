package com.leadforge.leadforge.controller;

import com.leadforge.leadforge.entity.Business;
import com.leadforge.leadforge.entity.LeadList;
import com.leadforge.leadforge.entity.LeadListItem;
import com.leadforge.leadforge.entity.LeadListItemId;
import com.leadforge.leadforge.repository.BusinessRepository;
import com.leadforge.leadforge.repository.LeadListRepository;
import com.leadforge.leadforge.repository.LeadListItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/lead-lists")
@RequiredArgsConstructor
public class LeadListController {

    private final LeadListRepository leadListRepository;
    private final LeadListItemRepository leadListItemRepository;
    private final BusinessRepository businessRepository;

    @PostMapping
    public ResponseEntity<LeadList> createList(@RequestBody LeadList list) {
        LeadList saved = leadListRepository.save(list);
        return ResponseEntity.ok(saved);
    }

    @GetMapping
    public ResponseEntity<List<LeadList>> getListsByProject(@RequestParam UUID projectId) {
        List<LeadList> lists = leadListRepository.findByProjectId(projectId);
        return ResponseEntity.ok(lists);
    }

    @PostMapping("/{listId}/items")
    public ResponseEntity<?> addLeadToList(
            @PathVariable UUID listId,
            @RequestParam UUID businessId) {
        LeadListItemId id = LeadListItemId.builder()
                .leadListId(listId)
                .businessId(businessId)
                .build();
        
        LeadListItem item = LeadListItem.builder().id(id).build();
        leadListItemRepository.save(item);
        return ResponseEntity.ok("Lead added to list successfully");
    }

    @DeleteMapping("/{listId}/items/{businessId}")
    @Transactional
    public ResponseEntity<?> removeLeadFromList(
            @PathVariable UUID listId,
            @PathVariable UUID businessId) {
        LeadListItemId id = LeadListItemId.builder()
                .leadListId(listId)
                .businessId(businessId)
                .build();
        leadListItemRepository.deleteById(id);
        return ResponseEntity.ok("Lead removed from list successfully");
    }

    @GetMapping("/{listId}/items")
    public ResponseEntity<List<Business>> getListItems(@PathVariable UUID listId) {
        List<LeadListItem> items = leadListItemRepository.findByIdLeadListId(listId);
        List<Business> details = new ArrayList<>();
        for (LeadListItem item : items) {
            businessRepository.findById(item.getId().getBusinessId()).ifPresent(details::add);
        }
        return ResponseEntity.ok(details);
    }
}
