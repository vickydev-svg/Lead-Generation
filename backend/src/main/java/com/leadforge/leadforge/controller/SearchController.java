package com.leadforge.leadforge.controller;

import com.leadforge.leadforge.dto.SearchRequest;
import com.leadforge.leadforge.entity.SearchJob;
import com.leadforge.leadforge.security.CustomUserDetails;
import com.leadforge.leadforge.service.SearchService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import com.leadforge.leadforge.repository.*;
import com.leadforge.leadforge.entity.*;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/searches")
@RequiredArgsConstructor
public class SearchController {

    private final SearchService searchService;
    private final SearchRepository searchRepository;
    private final SearchJobRepository searchJobRepository;
    private final BusinessRepository businessRepository;
    private final WebsiteContactRepository websiteContactRepository;
    private final WebsiteSocialRepository websiteSocialRepository;
    private final WebsiteAuditRepository websiteAuditRepository;
    private final AiAnalysisRepository aiAnalysisRepository;

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

    @GetMapping("/{searchId}/leads")
    public ResponseEntity<?> getSearchLeads(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable UUID searchId) {
        
        Optional<Search> searchOpt = searchRepository.findById(searchId);
        if (searchOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        
        Search search = searchOpt.get();
        List<Business> all = businessRepository.findBySearchId(searchId);
        List<Map<String, Object>> response = new ArrayList<>();
        
        for (Business b : all) {
            Optional<WebsiteContact> contact = websiteContactRepository.findByBusinessId(b.getId());
            Optional<WebsiteSocial> social = websiteSocialRepository.findByBusinessId(b.getId());
            Optional<WebsiteAudit> audit = websiteAuditRepository.findByBusinessId(b.getId());
            Optional<AiAnalysis> ai = aiAnalysisRepository.findByBusinessId(b.getId());
            
            Map<String, Object> map = new HashMap<>();
            map.put("id", b.getId());
            map.put("name", b.getName());
            map.put("category", b.getCategory() != null ? b.getCategory() : "");
            map.put("address", b.getAddress() != null ? b.getAddress() : "");
            map.put("phone", b.getPhone() != null ? b.getPhone() : "");
            map.put("website", b.getWebsite() != null ? b.getWebsite() : "");
            map.put("rating", b.getGoogleRating() != null ? b.getGoogleRating() : 0.0);
            map.put("reviews", b.getReviewCount() != null ? b.getReviewCount() : 0);
            map.put("email", contact.map(WebsiteContact::getEmail).orElse(""));
            map.put("facebook", social.map(WebsiteSocial::getFacebook).orElse(""));
            map.put("instagram", social.map(WebsiteSocial::getInstagram).orElse(""));
            map.put("linkedin", social.map(WebsiteSocial::getLinkedin).orElse(""));
            map.put("aiScore", audit.map(WebsiteAudit::getWebsiteScore).orElse(0));
            map.put("summary", ai.map(AiAnalysis::getSummary).orElse(""));
            map.put("opportunity", ai.map(AiAnalysis::getOpportunity).orElse(""));
            map.put("pitch", ai.map(AiAnalysis::getPitch).orElse(""));
            response.add(map);
        }
        return ResponseEntity.ok(response);
    }
}
