package com.leadforge.leadforge.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.leadforge.leadforge.entity.*;
import com.leadforge.leadforge.repository.*;
import com.leadforge.leadforge.security.SearchProgressHandler;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class SearchService {

    private final SearchRepository searchRepository;
    private final SearchJobRepository searchJobRepository;
    private final BusinessRepository businessRepository;
    private final WebsiteContactRepository websiteContactRepository;
    private final WebsiteSocialRepository websiteSocialRepository;
    private final WebsiteAuditRepository websiteAuditRepository;
    private final AiAnalysisRepository aiAnalysisRepository;
    private final UserRepository userRepository;
    
    private final CrawlerService crawlerService;
    private final OpenAiService openAiService;
    private final SearchProgressHandler progressHandler;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Transactional
    public SearchJob triggerSearch(UUID userId, String keyword, String location, Integer maxResults) {
        // 1. Create Search parameter record
        Search search = Search.builder()
                .userId(userId)
                .keyword(keyword)
                .location(location)
                .maxResults(maxResults != null ? maxResults : 10)
                .build();
        Search savedSearch = searchRepository.save(search);

        // 2. Create SearchJob status tracker
        SearchJob job = SearchJob.builder()
                .searchId(savedSearch.getId())
                .userId(userId)
                .status("Pending")
                .build();
        SearchJob savedJob = searchJobRepository.save(job);

        // 3. Trigger asynchronous search execution
        executeSearchAsync(savedSearch, savedJob);

        return savedJob;
    }

    @Async
    public void executeSearchAsync(Search search, SearchJob job) {
        log.info("Starting async search job: {} for keyword: {}", job.getId(), search.getKeyword());
        
        try {
            // Update job status to Running
            job.setStatus("Running");
            job = searchJobRepository.save(job);
            broadcastProgress(job);

            // Phase 4.1: Simulate/Scrape Google Maps results
            List<Business> foundBusinesses = simulateGoogleMapsScrape(search.getKeyword(), search.getLocation(), search.getMaxResults());
            List<Business> savedBusinesses = new ArrayList<>();

            int total = foundBusinesses.size();
            for (int i = 0; i < total; i++) {
                Business b = foundBusinesses.get(i);
                b = businessRepository.save(b);
                savedBusinesses.add(b);

                // Update business progress (e.g. 10% to 100%)
                int progress = (i + 1) * 100 / total;
                job.setProgressBusinesses(progress);
                job = searchJobRepository.save(job);
                broadcastProgress(job);
                Thread.sleep(300); // Small delay for realistic UI updates
            }

            // Phase 4.2: Asynchronous crawl for websites
            for (int i = 0; i < total; i++) {
                Business b = savedBusinesses.get(i);
                if (b.getWebsite() != null && !b.getWebsite().isBlank()) {
                    CrawlerService.CrawlResult crawlResult = crawlerService.crawlWebsite(b.getWebsite());
                    
                    // Save WebsiteContact
                    WebsiteContact contact = WebsiteContact.builder()
                            .businessId(b.getId())
                            .email(crawlResult.getEmail())
                            .phone(crawlResult.getPhone())
                            .contactPage(crawlResult.getContactPage())
                            .aboutPage(crawlResult.getAboutPage())
                            .build();
                    websiteContactRepository.save(contact);

                    // Save WebsiteSocial
                    WebsiteSocial social = WebsiteSocial.builder()
                            .businessId(b.getId())
                            .facebook(crawlResult.getFacebook())
                            .instagram(crawlResult.getInstagram())
                            .linkedin(crawlResult.getLinkedin())
                            .youtube(crawlResult.getYoutube())
                            .whatsappLink(crawlResult.getWhatsappLink())
                            .build();
                    websiteSocialRepository.save(social);

                    // Save WebsiteAudit
                    WebsiteAudit audit = WebsiteAudit.builder()
                            .businessId(b.getId())
                            .websiteScore(crawlResult.getWebsiteScore())
                            .hasHttps(crawlResult.isHasHttps())
                            .isMobileFriendly(crawlResult.isMobileFriendly())
                            .hasContactForm(crawlResult.isHasContactForm())
                            .hasContactPage(crawlResult.isHasContactPage())
                            .hasAboutPage(crawlResult.isHasAboutPage())
                            .hasSocialLinks(crawlResult.isHasSocialLinks())
                            .hasWhatsappButton(crawlResult.isHasWhatsappButton())
                            .hasTitleTag(crawlResult.isHasTitleTag())
                            .hasMetaDescription(crawlResult.isHasMetaDescription())
                            .hasSitemap(crawlResult.isHasSitemap())
                            .hasRobotsTxt(crawlResult.isHasRobotsTxt())
                            .build();
                    websiteAuditRepository.save(audit);
                }

                // Update website crawling progress
                int progress = (i + 1) * 100 / total;
                job.setProgressWebsites(progress);
                job = searchJobRepository.save(job);
                broadcastProgress(job);
                Thread.sleep(200);
            }

            // Phase 4.3: AI analysis using Gemini
            for (int i = 0; i < total; i++) {
                Business b = savedBusinesses.get(i);
                
                // Get audit score and HTTPS status
                Optional<WebsiteAudit> auditOpt = websiteAuditRepository.findByBusinessId(b.getId());
                Optional<WebsiteContact> contactOpt = websiteContactRepository.findByBusinessId(b.getId());
                Optional<WebsiteSocial> socialOpt = websiteSocialRepository.findByBusinessId(b.getId());

                int score = auditOpt.map(WebsiteAudit::getWebsiteScore).orElse(0);
                boolean hasHttps = auditOpt.map(WebsiteAudit::isHasHttps).orElse(false);
                String email = contactOpt.map(WebsiteContact::getEmail).orElse("");
                String phone = contactOpt.map(WebsiteContact::getPhone).orElse("");
                String fb = socialOpt.map(WebsiteSocial::getFacebook).orElse("");
                String ig = socialOpt.map(WebsiteSocial::getInstagram).orElse("");
                String li = socialOpt.map(WebsiteSocial::getLinkedin).orElse("");

                OpenAiService.AnalysisResult analysis = openAiService.analyzeBusiness(
                        b.getName(), b.getCategory(), b.getWebsite(), score, hasHttps, email, phone, fb, ig, li
                );

                AiAnalysis ai = AiAnalysis.builder()
                        .businessId(b.getId())
                        .summary(analysis.getSummary())
                        .opportunity(analysis.getOpportunity())
                        .pitch(analysis.getPitch())
                        .build();
                aiAnalysisRepository.save(ai);

                // Update AI progress
                int progress = (i + 1) * 100 / total;
                job.setProgressAnalysis(progress);
                job = searchJobRepository.save(job);
                broadcastProgress(job);
                Thread.sleep(200);
            }

            // Finalize search results count and deduct credits
            int creditsDeducted = total * 50; // 50 credits per business lead
            search.setLeadsFound(total);
            search.setCreditsSpent(creditsDeducted);
            searchRepository.save(search);

            // Deduct credits from user profile
            Optional<User> userOpt = userRepository.findById(search.getUserId());
            if (userOpt.isPresent()) {
                User user = userOpt.get();
                user.setCredits(Math.max(0, user.getCredits() - creditsDeducted));
                userRepository.save(user);
            }

            job.setStatus("Completed");
            searchJobRepository.save(job);
            broadcastProgress(job);
            log.info("Successfully completed search job: {}", job.getId());

        } catch (Exception e) {
            log.error("Failed executing search job: {}", job.getId(), e);
            job.setStatus("Failed");
            searchJobRepository.save(job);
            broadcastProgress(job);
        }
    }

    private void broadcastProgress(SearchJob job) {
        try {
            Map<String, Object> frame = Map.of(
                    "jobId", job.getId().toString(),
                    "searchId", job.getSearchId().toString(),
                    "status", job.getStatus(),
                    "progressBusinesses", job.getProgressBusinesses(),
                    "progressWebsites", job.getProgressWebsites(),
                    "progressAnalysis", job.getProgressAnalysis()
            );
            String json = objectMapper.writeValueAsString(frame);
            progressHandler.sendProgressUpdate(job.getUserId().toString(), json);
        } catch (Exception ex) {
            log.error("Failed to serialize or broadcast progress update", ex);
        }
    }

    private List<Business> simulateGoogleMapsScrape(String keyword, String location, int limit) {
        List<Business> list = new ArrayList<>();
        String normalizedKw = keyword.toLowerCase();

        // High quality set of real live web addresses/domains for crawling
        String[] realAgencies = {"https://www.wpengine.com", "https://www.wix.com", "https://www.hubspot.com", "https://www.shopify.com"};
        String[] realCafes = {"https://www.camposcoffee.com", "https://www.singleo.com.au"};
        String[] realDentists = {"https://www.identistry.com.au", "https://www.sydneydentists.com.au"};
        String[] fallbackSites = {"https://www.wikipedia.org", "https://news.ycombinator.com", "https://github.com", "https://about.google"};

        String[] selectedWebsites = fallbackSites;
        if (normalizedKw.contains("design") || normalizedKw.contains("agency") || normalizedKw.contains("web")) {
            selectedWebsites = realAgencies;
        } else if (normalizedKw.contains("coffee") || normalizedKw.contains("cafe")) {
            selectedWebsites = realCafes;
        } else if (normalizedKw.contains("dentist") || normalizedKw.contains("dental")) {
            selectedWebsites = realDentists;
        }

        // Generate matching leads
        for (int i = 0; i < Math.min(limit, 4); i++) {
            String name = generateBusinessName(keyword, i);
            String category = normalizedKw.contains("cafe") ? "Cafe" : normalizedKw.contains("dentist") ? "Dentist" : "Digital Agency";
            String website = selectedWebsites[i % selectedWebsites.length];

            list.add(Business.builder()
                    .name(name)
                    .category(category)
                    .address(String.format("%d %s St, %s", 10 + i * 5, keyword, location))
                    .phone(String.format("+61 2 9200 %d%d%d%d", i, i, i, i))
                    .website(website)
                    .googleRating(4.0 + (i * 0.2))
                    .reviewCount(15 + i * 18)
                    .googleMapsUrl("https://maps.google.com/?cid=" + UUID.randomUUID())
                    .latitude(-33.8688 + (i * 0.005))
                    .longitude(151.2093 + (i * 0.005))
                    .status("OPERATIONAL")
                    .build());
        }
        return list;
    }

    private String generateBusinessName(String keyword, int index) {
        String capitalized = keyword.substring(0, 1).toUpperCase() + keyword.substring(1);
        String[] suffixes = {"Co", "Group", "Solutions", "HQ", "Partners"};
        return String.format("%s %s %s", capitalized, suffixes[index % suffixes.length], index + 1);
    }
}
