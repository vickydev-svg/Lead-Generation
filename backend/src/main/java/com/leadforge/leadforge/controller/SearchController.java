package com.leadforge.leadforge.controller;

import com.leadforge.leadforge.dto.SearchRequest;
import com.leadforge.leadforge.entity.SearchJob;
import com.leadforge.leadforge.security.CustomUserDetails;
import com.leadforge.leadforge.service.SearchService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/searches")
@RequiredArgsConstructor
public class SearchController {

    private final SearchService searchService;

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
}
