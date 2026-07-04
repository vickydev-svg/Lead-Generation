# LeadForge (Sales Prospecting Workspace) - Project Plan

This document outlines the step-by-step implementation plan to transition this workspace into the full **LeadForge** platform.

## Workspace Directory Structure
We will organize the code into frontend and backend subdirectories:
```text
/Applications/Lead Generation/
  ├── frontend/          # React + Vite application (upgraded)
  └── backend/           # Spring Boot backend application
```

---

## Step-by-Step Roadmap

### Phase 1: File Reorganization & Backend Initialization
- [ ] Create `/frontend` directory and move current React codebase inside it.
- [ ] Create `/backend` directory.
- [ ] Initialize Spring Boot skeleton using Maven with the following dependencies:
  - Spring Web
  - Spring Security
  - Spring Data JPA
  - PostgreSQL Driver
  - Flyway Migration
  - Lombok
  - WebSocket
  - Validation

---

### Phase 2: PostgreSQL Schema Configuration (Flyway)
- [ ] Set up local PostgreSQL database configuration.
- [ ] Create a Flyway migration file containing:
  - `users` (credentials, name, credits)
  - `projects` (campaign workspaces)
  - `businesses` (address, phone, Google maps ratings)
  - `website_contacts` & `website_socials` (scraped info)
  - `website_audits` (HTTPS, mobile friendly, title tags, sitemaps, etc.)
  - `project_leads` (associating leads with campaigns)
  - `searches` & `search_jobs` (keyword, location, status tracking)
  - `lead_lists` & `lead_list_items` (user folders)
  - `exports` (export download logs)
  - `ai_analysis` (summaries and suggested sales pitches)

---

### Phase 3: JWT Security & User API Endpoints
- [ ] Implement Spring Security configuration.
- [ ] Add JWT utility classes for generating and verifying tokens.
- [ ] Implement Registration (`/api/auth/register`) and Login (`/api/auth/login`) endpoints.
- [ ] Implement Profile update and Password change APIs.

---

### Phase 4: Crawling & AI Analytics Engine
- [ ] Implement local scraper module for Google Maps data (V1).
- [ ] Create website crawler using **Jsoup** and **Playwright** to scrape contact details, social links, and health metrics.
- [ ] Write integration service for **Gemini** (or OpenAI) API to analyze site content and generate short pitches.
- [ ] Set up Spring WebSocket handler to stream live search progress statuses.

---

### Phase 5: Workspace REST Controllers
- [ ] Implement `ProjectController` (CRUD projects).
- [ ] Implement `LeadListController` (create folders and segments).
- [ ] Implement `SearchController` (trigger searches, fetch history).
- [ ] Implement `ExportController` (generate Excel/CSV files).

---

### Phase 6: Frontend Upgrade (Tailwind, shadcn, Router)
- [ ] Move `/frontend` project dependencies to support Tailwind CSS, React Router, and TanStack Query.
- [ ] Configure Tailwind CSS and add shadcn UI components.
- [ ] Rewrite navigation routes (landing, auth forms, dashboard panels).
- [ ] Wire up Axios HTTP clients and TanStack Query hooks to communicate with Spring Boot endpoints.
- [ ] Connect WebSocket listener to showcase real-time crawlers.

---

### Phase 7: Testing & E2E Validation
- [ ] Run backend unit tests.
- [ ] Validate full search -> crawl -> AI scoring -> list saving -> Excel export cycle.
