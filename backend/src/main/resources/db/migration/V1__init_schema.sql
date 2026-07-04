-- Enable pgcrypto for gen_random_uuid() if needed (already enabled by default in Postgres 13+)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. Create users table
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  full_name VARCHAR(255),
  company VARCHAR(255),
  credits INTEGER DEFAULT 12450,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create projects table
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create businesses table
CREATE TABLE IF NOT EXISTS public.businesses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  category VARCHAR(255),
  address TEXT,
  phone VARCHAR(50),
  website VARCHAR(255),
  google_rating NUMERIC(3, 2),
  review_count INTEGER,
  google_maps_url TEXT,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  status VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Create website_contacts table
CREATE TABLE IF NOT EXISTS public.website_contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID UNIQUE REFERENCES public.businesses(id) ON DELETE CASCADE,
  email VARCHAR(255),
  phone VARCHAR(50),
  contact_page VARCHAR(255),
  about_page VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Create website_socials table
CREATE TABLE IF NOT EXISTS public.website_socials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID UNIQUE REFERENCES public.businesses(id) ON DELETE CASCADE,
  facebook VARCHAR(255),
  instagram VARCHAR(255),
  linkedin VARCHAR(255),
  youtube VARCHAR(255),
  whatsapp_link VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Create website_audits table
CREATE TABLE IF NOT EXISTS public.website_audits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID UNIQUE REFERENCES public.businesses(id) ON DELETE CASCADE,
  website_score INTEGER DEFAULT 0,
  has_https BOOLEAN DEFAULT FALSE,
  is_mobile_friendly BOOLEAN DEFAULT FALSE,
  has_contact_form BOOLEAN DEFAULT FALSE,
  has_contact_page BOOLEAN DEFAULT FALSE,
  has_about_page BOOLEAN DEFAULT FALSE,
  has_social_links BOOLEAN DEFAULT FALSE,
  has_whatsapp_button BOOLEAN DEFAULT FALSE,
  has_title_tag BOOLEAN DEFAULT FALSE,
  has_meta_description BOOLEAN DEFAULT FALSE,
  has_sitemap BOOLEAN DEFAULT FALSE,
  has_robots_txt BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Create project_leads table
CREATE TABLE IF NOT EXISTS public.project_leads (
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE,
  PRIMARY KEY (project_id, business_id)
);

-- 8. Create searches table
CREATE TABLE IF NOT EXISTS public.searches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  keyword VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  radius INTEGER,
  max_results INTEGER,
  leads_found INTEGER DEFAULT 0,
  credits_spent INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. Create search_jobs table
CREATE TABLE IF NOT EXISTS public.search_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  search_id UUID REFERENCES public.searches(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  status VARCHAR(50) NOT NULL, -- 'Running', 'Completed', 'Failed', 'Pending'
  progress_businesses INTEGER DEFAULT 0,
  progress_websites INTEGER DEFAULT 0,
  progress_analysis INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10. Create lead_lists table
CREATE TABLE IF NOT EXISTS public.lead_lists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 11. Create lead_list_items table
CREATE TABLE IF NOT EXISTS public.lead_list_items (
  lead_list_id UUID REFERENCES public.lead_lists(id) ON DELETE CASCADE,
  business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE,
  PRIMARY KEY (lead_list_id, business_id)
);

-- 12. Create exports table
CREATE TABLE IF NOT EXISTS public.exports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  filename VARCHAR(255) NOT NULL,
  format VARCHAR(50) NOT NULL,
  records_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 13. Create ai_analysis table
CREATE TABLE IF NOT EXISTS public.ai_analysis (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID UNIQUE REFERENCES public.businesses(id) ON DELETE CASCADE,
  summary TEXT,
  opportunity TEXT,
  pitch TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
