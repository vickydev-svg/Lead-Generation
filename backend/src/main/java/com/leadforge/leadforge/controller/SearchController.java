package com.leadforge.leadforge.controller;

import com.leadforge.leadforge.dto.SearchRequest;
import com.leadforge.leadforge.entity.SearchJob;
import com.leadforge.leadforge.security.CustomUserDetails;
import com.leadforge.leadforge.service.SearchService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import com.leadforge.leadforge.repository.SearchJobRepository;
import com.leadforge.leadforge.repository.SearchRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/searches")
@RequiredArgsConstructor
public class SearchController {

    private final SearchService searchService;
    private final SearchRepository searchRepository;
    private final SearchJobRepository searchJobRepository;

    @PostMapping
    public ResponseEntity<?> triggerSearch(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @Valid @RequestBody SearchRequest request) {
        
        try {
            SearchJob job = searchService.triggerSearch(
                    userDetails.getId(),
                    request.getKeyword(),
                    request.getLocation(),
                    request.getMaxResults()
            );
            return ResponseEntity.ok(job);
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body("Failed to trigger search: " + ex.getMessage());
        }
    }

    @GetMapping("/history")
    public ResponseEntity<?> getSearchHistory(@AuthenticationPrincipal CustomUserDetails userDetails) {
        return ResponseEntity.ok(searchRepository.findByUserId(userDetails.getId()));
    }

    @GetMapping("/jobs")
    public ResponseEntity<?> getSearchJobs(@AuthenticationPrincipal CustomUserDetails userDetails) {
        return ResponseEntity.ok(searchJobRepository.findByUserId(userDetails.getId()));
    }
}
