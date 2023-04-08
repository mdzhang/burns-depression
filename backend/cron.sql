select
  cron.schedule(
    'invoke-keepalive-daily',
    '0 14 * * *', -- every day @ 10a CT
    $$
    select
      net.http_post(
          url:='https://ndiwftxorygotvnblwbg.functions.supabase.co/keepalive',
          headers:='{"Content-Type": "application/json", "Authorization": "Bearer ANON_KEY"}'::jsonb
      ) as request_id;
    $$
  );
