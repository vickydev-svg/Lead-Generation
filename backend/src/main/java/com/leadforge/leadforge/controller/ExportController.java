package com.leadforge.leadforge.controller;

import com.leadforge.leadforge.entity.*;
import com.leadforge.leadforge.repository.*;
import com.leadforge.leadforge.security.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/exports")
@RequiredArgsConstructor
@Slf4j
public class ExportController {

    private final ExportRepository exportRepository;
    private final LeadListItemRepository leadListItemRepository;
    private final BusinessRepository businessRepository;
    private final WebsiteContactRepository websiteContactRepository;
    private final WebsiteSocialRepository websiteSocialRepository;
    private final WebsiteAuditRepository websiteAuditRepository;
    private final AiAnalysisRepository aiAnalysisRepository;

    @PostMapping
    @Transactional
    public ResponseEntity<?> exportLeads(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @RequestParam UUID leadListId) {
        
        try {
            // 1. Get all lead list items
            List<LeadListItem> items = leadListItemRepository.findByIdLeadListId(leadListId);
            if (items.isEmpty()) {
                return ResponseEntity.badRequest().body("No leads found in this list to export");
            }

            // 2. Fetch full details and construct CSV contents
            StringBuilder csv = new StringBuilder();
            // CSV Header
            csv.append("Name,Category,Website,Phone,Address,Google Rating,Email,Facebook,LinkedIn,Website Score,AI Summary,AI Pitch\n");

            List<Business> businesses = new ArrayList<>();
            for (LeadListItem item : items) {
                Optional<Business> bOpt = businessRepository.findById(item.getId().getBusinessId());
                if (bOpt.isPresent()) {
                    Business b = bOpt.get();
                    businesses.add(b);

                    Optional<WebsiteContact> contactOpt = websiteContactRepository.findByBusinessId(b.getId());
                    Optional<WebsiteSocial> socialOpt = websiteSocialRepository.findByBusinessId(b.getId());
                    Optional<WebsiteAudit> auditOpt = websiteAuditRepository.findByBusinessId(b.getId());
                    Optional<AiAnalysis> aiOpt = aiAnalysisRepository.findByBusinessId(b.getId());

                    String email = contactOpt.map(WebsiteContact::getEmail).orElse("");
                    String phone = b.getPhone() != null ? b.getPhone() : "";
                    String fb = socialOpt.map(WebsiteSocial::getFacebook).orElse("");
                    String li = socialOpt.map(WebsiteSocial::getLinkedin).orElse("");
                    int score = auditOpt.map(WebsiteAudit::getWebsiteScore).orElse(0);
                    String summary = aiOpt.map(AiAnalysis::getSummary).orElse("").replace("\"", "\"\"");
                    String pitch = aiOpt.map(AiAnalysis::getPitch).orElse("").replace("\"", "\"\"");

                    // Append row
                    csv.append(String.format("\"%s\",\"%s\",\"%s\",\"%s\",\"%s\",%.1f,\"%s\",\"%s\",\"%s\",%d,\"%s\",\"%s\"\n",
                            b.getName().replace("\"", "\"\""),
                            b.getCategory() != null ? b.getCategory().replace("\"", "\"\"") : "",
                            b.getWebsite() != null ? b.getWebsite().replace("\"", "\"\"") : "",
                            phone.replace("\"", "\"\""),
                            b.getAddress() != null ? b.getAddress().replace("\"", "\"\"") : "",
                            b.getGoogleRating() != null ? b.getGoogleRating() : 0.0,
                            email.replace("\"", "\"\""),
                            fb.replace("\"", "\"\""),
                            li.replace("\"", "\"\""),
                            score,
                            summary,
                            pitch
                    ));
                }
            }

            // 3. Log Export Metadata
            String filename = "leads_list_" + leadListId + ".csv";
            Export exportLog = Export.builder()
                    .userId(userDetails.getId())
                    .filename(filename)
                    .format("CSV")
                    .recordsCount(businesses.size())
                    .build();
            exportRepository.save(exportLog);

            // 4. Return file attachment response
            byte[] fileBytes = csv.toString().getBytes(StandardCharsets.UTF_8);
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.parseMediaType("text/csv"));
            headers.setContentDispositionFormData("attachment", filename);
            headers.setCacheControl("must-revalidate, post-check=0, pre-check=0");

            return new ResponseEntity<>(fileBytes, headers, HttpStatus.OK);

        } catch (Exception ex) {
            log.error("Failed to generate export file", ex);
            return ResponseEntity.status(500).body("Export failed: " + ex.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<Export>> getExportHistory(@AuthenticationPrincipal CustomUserDetails userDetails) {
        List<Export> history = exportRepository.findByUserId(userDetails.getId());
        return ResponseEntity.ok(history);
    }
}
