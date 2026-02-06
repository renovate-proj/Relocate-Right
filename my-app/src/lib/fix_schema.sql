-- Run this script to add the missing columns to your existing 'locations' table

ALTER TABLE public.locations 
ADD COLUMN IF NOT EXISTS lat float,
ADD COLUMN IF NOT EXISTS lng float;

-- Verify the columns are added
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'locations';
