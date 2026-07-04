package com.leadforge.leadforge.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "website_audits")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WebsiteAudit {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "business_id", unique = true)
    private UUID businessId;

    @Column(name = "website_score")
    private int websiteScore;

    @Column(name = "has_https")
    private boolean hasHttps;

    @Column(name = "is_mobile_friendly")
    private boolean isMobileFriendly;

    @Column(name = "has_contact_form")
    private boolean hasContactForm;

    @Column(name = "has_contact_page")
    private boolean hasContactPage;

    @Column(name = "has_about_page")
    private boolean hasAboutPage;

    @Column(name = "has_social_links")
    private boolean hasSocialLinks;

    @Column(name = "has_whatsapp_button")
    private boolean hasWhatsappButton;

    @Column(name = "has_title_tag")
    private boolean hasTitleTag;

    @Column(name = "has_meta_description")
    private boolean hasMetaDescription;

    @Column(name = "has_sitemap")
    private boolean hasSitemap;

    @Column(name = "has_robots_txt")
    private boolean hasRobotsTxt;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private OffsetDateTime createdAt;
}
