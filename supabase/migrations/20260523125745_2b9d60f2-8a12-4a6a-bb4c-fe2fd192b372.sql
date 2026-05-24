create table public.job_applications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  reference_code text not null unique,
  job_slug text not null,
  job_title text not null,
  job_company text not null,
  full_name text not null,
  email text not null,
  phone text not null,
  passport text not null,
  nationality text,
  city text,
  experience text not null,
  current_position text not null,
  skills text,
  cover_note text,
  cv_path text,
  photo_path text,
  status text not null default 'submitted',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_job_applications_user on public.job_applications(user_id);
create index idx_job_applications_slug on public.job_applications(job_slug);

alter table public.job_applications enable row level security;

create policy "Users view own applications" on public.job_applications for select using (auth.uid() = user_id);
create policy "Users insert own applications" on public.job_applications for insert with check (auth.uid() = user_id);
create policy "Users update own applications" on public.job_applications for update using (auth.uid() = user_id);
create policy "Admins view all applications" on public.job_applications for select using (public.has_role(auth.uid(), 'admin'));

create trigger trg_job_applications_updated_at before update on public.job_applications for each row execute function public.tg_set_updated_at();

insert into storage.buckets (id, name, public) values ('application-documents', 'application-documents', false) on conflict (id) do nothing;

create policy "Users upload own documents" on storage.objects for insert with check (bucket_id = 'application-documents' and auth.uid()::text = (storage.foldername(name))[1]);
create policy "Users read own documents" on storage.objects for select using (bucket_id = 'application-documents' and auth.uid()::text = (storage.foldername(name))[1]);
create policy "Users update own documents" on storage.objects for update using (bucket_id = 'application-documents' and auth.uid()::text = (storage.foldername(name))[1]);
create policy "Users delete own documents" on storage.objects for delete using (bucket_id = 'application-documents' and auth.uid()::text = (storage.foldername(name))[1]);