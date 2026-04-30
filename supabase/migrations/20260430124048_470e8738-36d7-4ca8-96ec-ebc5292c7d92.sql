ALTER TABLE public.trades
  ADD COLUMN IF NOT EXISTS screenshot_before_url text,
  ADD COLUMN IF NOT EXISTS screenshot_after_url text;

INSERT INTO storage.buckets (id, name, public)
VALUES ('trade-screenshots', 'trade-screenshots', false)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Users can view own trade screenshots"
ON storage.objects FOR SELECT
USING (bucket_id = 'trade-screenshots' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can upload own trade screenshots"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'trade-screenshots' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update own trade screenshots"
ON storage.objects FOR UPDATE
USING (bucket_id = 'trade-screenshots' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete own trade screenshots"
ON storage.objects FOR DELETE
USING (bucket_id = 'trade-screenshots' AND auth.uid()::text = (storage.foldername(name))[1]);