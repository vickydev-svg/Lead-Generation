package com.leadforge.leadforge.service;

import lombok.Builder;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashSet;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@Slf4j
public class CrawlerService {

    private static final Pattern EMAIL_PATTERN = Pattern.compile(
            "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}"
    );

    // Simple phone pattern matching numbers like +123456789, (123) 456-7890, 123-456-7890, etc.
    private static final Pattern PHONE_PATTERN = Pattern.compile(
            "\\+?\\d{1,4}?[-.\\s]?\\(?\\d{1,3}?\\)?[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,9}"
    );

    @Data
    @Builder
    public static class CrawlResult {
        private String email;
        private String phone;
        private String contactPage;
        private String aboutPage;
        
        // Socials
        private String facebook;
        private String instagram;
        private String linkedin;
        private String youtube;
        private String whatsappLink;

        // Audits
        private int websiteScore;
        private boolean hasHttps;
        private boolean isMobileFriendly;
        private boolean hasContactForm;
        private boolean hasContactPage;
        private boolean hasAboutPage;
        private boolean hasSocialLinks;
        private boolean hasWhatsappButton;
        private boolean hasTitleTag;
        private boolean hasMetaDescription;
        private boolean hasSitemap;
        private boolean hasRobotsTxt;
    }

    public CrawlResult crawlWebsite(String websiteUrl) {
        if (websiteUrl == null || websiteUrl.isBlank()) {
            return getEmptyResult();
        }

        // Clean up URL format
        String formattedUrl = websiteUrl.trim();
        if (!formattedUrl.startsWith("http://") && !formattedUrl.startsWith("https://")) {
            formattedUrl = "https://" + formattedUrl;
        }

        CrawlResult.CrawlResultBuilder builder = CrawlResult.builder();
        builder.hasHttps(formattedUrl.startsWith("https://"));

        Set<String> emailsFound = new HashSet<>();
        Set<String> phonesFound = new HashSet<>();
        Set<String> contactPages = new HashSet<>();
        Set<String> aboutPages = new HashSet<>();

        try {
            log.info("Crawling main URL: {}", formattedUrl);
            Connection.Response response = Jsoup.connect(formattedUrl)
                    .userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36")
                    .timeout(6000)
                    .followRedirects(true)
                    .execute();

            Document doc = response.parse();

            // Extract basic audits
            String title = doc.title();
            builder.hasTitleTag(title != null && !title.isBlank());

            String metaDescription = doc.select("meta[name=description]").attr("content");
            builder.hasMetaDescription(metaDescription != null && !metaDescription.isBlank());

            // Simple viewport responsive check
            boolean hasViewport = !doc.select("meta[name=viewport]").isEmpty();
            builder.isMobileFriendly(hasViewport);

            // Scan home page body for emails/phones
            extractEmailsAndPhones(doc.text(), emailsFound, phonesFound);

            // Find all anchor links on the page
            Elements links = doc.select("a[href]");
            for (Element link : links) {
                String href = link.attr("abs:href");
                String text = link.text().toLowerCase();

                // 1. Check for socials
                checkSocials(href, builder);

                // 2. Identify Contact / About pages
                if (isContactLink(href, text, formattedUrl)) {
                    contactPages.add(href);
                    builder.hasContactPage(true);
                }
                if (isAboutLink(href, text, formattedUrl)) {
                    aboutPages.add(href);
                    builder.hasAboutPage(true);
                }
                if (link.select("form").size() > 0 || text.contains("submit") || text.contains("contact form")) {
                    builder.hasContactForm(true);
                }
            }

            // Check if page has form elements directly
            if (!doc.select("form").isEmpty()) {
                builder.hasContactForm(true);
            }

            // Crawl secondary pages (Contact / About) to find deeper contact details
            crawlSecondaryPage(contactPages, emailsFound, phonesFound);
            crawlSecondaryPage(aboutPages, emailsFound, phonesFound);

            // Populate extracted contacts
            if (!emailsFound.isEmpty()) {
                builder.email(emailsFound.iterator().next());
            }
            if (!phonesFound.isEmpty()) {
                builder.phone(phonesFound.iterator().next());
            }
            if (!contactPages.isEmpty()) {
                builder.contactPage(contactPages.iterator().next());
            }
            if (!aboutPages.isEmpty()) {
                builder.aboutPage(aboutPages.iterator().next());
            }

            // Perform robots.txt and sitemap.xml checks
            builder.hasRobotsTxt(checkUrlExists(formattedUrl + "/robots.txt"));
            builder.hasSitemap(checkUrlExists(formattedUrl + "/sitemap.xml") || checkUrlExists(formattedUrl + "/sitemap_index.xml"));

        } catch (Exception e) {
            log.warn("Error crawling main page {}: {}", formattedUrl, e.getMessage());
        }

        // Calculate a website audit quality score (0 to 100)
        CrawlResult result = builder.build();
        result.setWebsiteScore(calculateScore(result));
        return result;
    }

    private void extractEmailsAndPhones(String text, Set<String> emails, Set<String> phones) {
        if (text == null) return;
        
        Matcher emailMatcher = EMAIL_PATTERN.matcher(text);
        while (emailMatcher.find()) {
            String email = emailMatcher.group().toLowerCase().trim();
            // Simple validation to exclude common false positives
            if (!email.endsWith(".png") && !email.endsWith(".jpg") && !email.endsWith(".gif") && !email.endsWith(".webp")) {
                emails.add(email);
            }
        }

        Matcher phoneMatcher = PHONE_PATTERN.matcher(text);
        while (phoneMatcher.find()) {
            String phone = phoneMatcher.group().trim();
            if (phone.length() >= 7 && phone.length() <= 20) {
                phones.add(phone);
            }
        }
    }

    private void checkSocials(String href, CrawlResult.CrawlResultBuilder builder) {
        if (href == null) return;
        String lowerHref = href.toLowerCase();

        if (lowerHref.contains("facebook.com") || lowerHref.contains("fb.com")) {
            builder.facebook(href);
            builder.hasSocialLinks(true);
        } else if (lowerHref.contains("instagram.com")) {
            builder.instagram(href);
            builder.hasSocialLinks(true);
        } else if (lowerHref.contains("linkedin.com/company") || lowerHref.contains("linkedin.com/in")) {
            builder.linkedin(href);
            builder.hasSocialLinks(true);
        } else if (lowerHref.contains("youtube.com")) {
            builder.youtube(href);
            builder.hasSocialLinks(true);
        } else if (lowerHref.contains("wa.me") || lowerHref.contains("api.whatsapp.com") || lowerHref.contains("whatsapp.com")) {
            builder.whatsappLink(href);
            builder.hasWhatsappButton(true);
        }
    }

    private boolean isContactLink(String href, String text, String baseUrl) {
        if (href == null || !href.startsWith(baseUrl)) return false;
        return text.contains("contact") || text.contains("reach") || text.contains("support") || href.contains("contact");
    }

    private boolean isAboutLink(String href, String text, String baseUrl) {
        if (href == null || !href.startsWith(baseUrl)) return false;
        return text.contains("about") || text.contains("who we are") || text.contains("our team") || href.contains("about");
    }

    private void crawlSecondaryPage(Set<String> urls, Set<String> emails, Set<String> phones) {
        for (String url : urls) {
            try {
                log.info("Crawling secondary page: {}", url);
                Document doc = Jsoup.connect(url)
                        .userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36")
                        .timeout(4000)
                        .followRedirects(true)
                        .get();
                extractEmailsAndPhones(doc.text(), emails, phones);
            } catch (Exception e) {
                log.debug("Failed crawling secondary page {}: {}", url, e.getMessage());
            }
        }
    }

    private boolean checkUrlExists(String fileUrl) {
        try {
            URL url = new URL(fileUrl);
            HttpURLConnection huc = (HttpURLConnection) url.openConnection();
            huc.setRequestMethod("HEAD");
            huc.setConnectTimeout(2000);
            huc.setReadTimeout(2000);
            int responseCode = huc.getResponseCode();
            return responseCode == HttpURLConnection.HTTP_OK;
        } catch (Exception e) {
            return false;
        }
    }

    private int calculateScore(CrawlResult r) {
        int score = 0;
        if (r.isHasHttps()) score += 15;
        if (r.isMobileFriendly()) score += 15;
        if (r.isHasTitleTag()) score += 10;
        if (r.isHasMetaDescription()) score += 10;
        if (r.isHasContactPage()) score += 10;
        if (r.isHasAboutPage()) score += 10;
        if (r.isHasSocialLinks()) score += 10;
        if (r.isHasContactForm()) score += 10;
        if (r.isHasRobotsTxt()) score += 5;
        if (r.isHasSitemap()) score += 5;
        return score;
    }

    private CrawlResult getEmptyResult() {
        return CrawlResult.builder()
                .websiteScore(0)
                .build();
    }
}
