
-- AI Rashed Music database
-- Run this in the Supabase SQL Editor.

create table if not exists public.songs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  media_type text not null
    check (media_type in ('audio', 'video')),
  media_url text not null,
  cover_url text,
  description text default '',
  published boolean not null default false,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

alter table public.songs enable row level security;

-- Public visitors can only read published songs.
create policy "Anyone can view published songs"
on public.songs
for select
to anon, authenticated
using (published = true);

-- Admin allow-list.
create table if not exists public.app_admins (
  user_id uuid primary key references auth.users(id) on delete cascade
);

alter table public.app_admins enable row level security;

-- Users cannot read or change the admin list through public access.
create policy "Admins can view their own admin record"
on public.app_admins
for select
to authenticated
using (user_id = auth.uid());

-- Only allow-listed admins can insert or update songs.
create policy "Admins can insert songs"
on public.songs
for insert
to authenticated
with check (
  exists (
    select 1
    from public.app_admins a
    where a.user_id = auth.uid()
  )
  and created_by = auth.uid()
);

create policy "Admins can update songs"
on public.songs
for update
to authenticated
using (
  exists (
    select 1
    from public.app_admins a
    where a.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1
    from public.app_admins a
    where a.user_id = auth.uid()
  )
);

create policy "Admins can delete songs"
on public.songs
for delete
to authenticated
using (
  exists (
    select 1
    from public.app_admins a
    where a.user_id = auth.uid()
  )
);
