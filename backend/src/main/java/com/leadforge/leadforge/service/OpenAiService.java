package com.leadforge.leadforge.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Builder;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class OpenAiService {

    private final RestClient restClient;
    private final ObjectMapper objectMapper;

    @Value("${app.openai.key:${OPENAI_API_KEY:}}")
    private String apiKey;

    public OpenAiService(ObjectMapper objectMapper) {
        this.restClient = RestClient.builder().build();
        this.objectMapper = objectMapper;
    }

    @Data
    @Builder
    public static class AnalysisResult {
        private String summary;
        private String opportunity;
        private String pitch;
    }

    public AnalysisResult analyzeBusiness(String name, String category, String website, int auditScore, 
                                         boolean hasHttps, String email, String phone, String facebook, 
                                         String instagram, String linkedin) {
        
        if (apiKey == null || apiKey.isBlank()) {
            log.info("OpenAI API key is not configured. Generating realistic fallback analysis for {}", name);
            return generateFallbackAnalysis(name, category, website, auditScore, hasHttps, email, phone);
        }

        String prompt = String.format(
                "You are an expert sales prospecting assistant. Analyze the following business and website audit details and return a JSON object containing three fields: 'summary', 'opportunity', and 'pitch'.\n\n" +
                "Business Info:\n" +
                "- Name: %s\n" +
                "- Category: %s\n" +
                "- Website: %s\n" +
                "- SEO/Audit Score: %d/100 (higher is better)\n" +
                "- Has HTTPS: %b\n" +
                "- Scraped Email: %s\n" +
                "- Scraped Phone: %s\n" +
                "- Socials: Facebook: %s, Instagram: %s, LinkedIn: %s\n\n" +
                "Requirements:\n" +
                "1. 'summary': 1-2 sentence overview of who they are and their online presence.\n" +
                "2. 'opportunity': Identify 1-2 clear weaknesses or optimization points (e.g. low audit score, missing social links, missing HTTPS security, missing email contact channels, etc.) that a digital agency could offer to fix.\n" +
                "3. 'pitch': A short, compelling 2-sentence B2B sales outreach pitch offering to help them fix those issues. Keep it friendly and professional.\n\n" +
                "Return ONLY a raw JSON object matching this schema:\n" +
                "{\n" +
                "  \"summary\": \"string\",\n" +
                "  \"opportunity\": \"string\",\n" +
                "  \"pitch\": \"string\"\n" +
                "}",
                name, category, website, auditScore, hasHttps, email, phone, facebook, instagram, linkedin
        );

        try {
            Map<String, Object> requestBody = Map.of(
                    "model", "gpt-4o-mini",
                    "messages", List.of(
                            Map.of("role", "user", "content", prompt)
                    ),
                    "response_format", Map.of("type", "json_object")
            );

            log.info("Sending request to OpenAI (gpt-4o-mini) for business: {}", name);
            String responseStr = restClient.post()
                    .uri("https://api.openai.com/v1/chat/completions")
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + apiKey)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(requestBody)
                    .retrieve()
                    .body(String.class);

            JsonNode rootNode = objectMapper.readTree(responseStr);
            String jsonText = rootNode.path("choices")
                    .path(0)
                    .path("message")
                    .path("content")
                    .asText();

            JsonNode analysisNode = objectMapper.readTree(jsonText.trim());
            return AnalysisResult.builder()
                    .summary(analysisNode.path("summary").asText("No summary generated."))
                    .opportunity(analysisNode.path("opportunity").asText("No clear opportunities found."))
                    .pitch(analysisNode.path("pitch").asText("No pitch generated."))
                    .build();

        } catch (Exception ex) {
            log.error("OpenAI API call failed for {}: {}. Using fallback analysis.", name, ex.getMessage());
            return generateFallbackAnalysis(name, category, website, auditScore, hasHttps, email, phone);
        }
    }

    private AnalysisResult generateFallbackAnalysis(String name, String category, String website, 
                                                    int auditScore, boolean hasHttps, String email, String phone) {
        String summary = String.format("%s is a %s business located in our target area, operating an online portal at %s.", 
                name, category != null ? category.toLowerCase() : "local service", website != null ? website : "their custom domain");
        
        StringBuilder opportunity = new StringBuilder();
        if (!hasHttps) {
            opportunity.append("Website is not secured via SSL (HTTP), which harms customer trust and hurts SEO ranking. ");
        }
        if (auditScore < 60) {
            opportunity.append(String.format("Low optimization score of %d/100 indicates significant issues with meta description tags, sitemaps, or mobile layout scaling. ", auditScore));
        }
        if (email == null || email.isBlank()) {
            opportunity.append("No direct public email addresses found, which limits lead capturing and customer inquiries. ");
        }
        if (opportunity.length() == 0) {
            opportunity.append("Opportunities exist to optimize site speed performance and add custom WhatsApp booking tools.");
        }

        String pitch = String.format("Hi team %s, I checked your website at %s and noticed a few simple fixes like security encryption and SEO tags that could boost your inbound leads. Would you be open to a quick chat this week to show you how to resolve these?", 
                name, website != null ? website : "");

        return AnalysisResult.builder()
                .summary(summary)
                .opportunity(opportunity.toString().trim())
                .pitch(pitch)
                .build();
    }
}
