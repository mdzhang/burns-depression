-- enter @ e.g. https://app.supabase.com/project/<project id>/sql

create table quiz_results (
  id serial primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  result jsonb,
  -- UUID from auth.users table
  user_id uuid not null
);

ALTER TABLE quiz_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY user_update_own_quiz_results ON quiz_results
    FOR ALL
    USING (auth.uid() = user_id);
