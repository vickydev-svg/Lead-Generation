-- Add search_id to businesses table referencing searches
ALTER TABLE public.businesses ADD COLUMN search_id UUID REFERENCES public.searches(id) ON DELETE CASCADE;
