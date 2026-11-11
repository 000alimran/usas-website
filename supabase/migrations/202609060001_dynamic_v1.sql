create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  role text not null default 'member' check (role in ('super_admin','admin','editor','membership_manager','event_manager','program_manager','finance','contributor','member')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.pages (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  eyebrow text,
  excerpt text,
  body jsonb not null default '{}'::jsonb,
  seo_title text,
  meta_description text,
  status text not null default 'draft' check (status in ('draft','published','archived')),
  published_at timestamptz,
  created_by uuid references public.profiles(id) on delete set null,
  updated_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  created_at timestamptz not null default now()
);

create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text,
  body jsonb not null default '{}'::jsonb,
  featured_image_url text,
  author_id uuid references public.profiles(id) on delete set null,
  category_id uuid references public.categories(id) on delete set null,
  seo_title text,
  meta_description text,
  status text not null default 'draft' check (status in ('draft','published','archived')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.programs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  summary text,
  body jsonb not null default '{}'::jsonb,
  featured_image_url text,
  status text not null default 'draft' check (status in ('draft','published','archived')),
  application_open boolean not null default false,
  application_deadline timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  summary text,
  body jsonb not null default '{}'::jsonb,
  banner_url text,
  venue text,
  starts_at timestamptz,
  ends_at timestamptz,
  registration_deadline timestamptz,
  capacity integer check (capacity is null or capacity > 0),
  registration_open boolean not null default false,
  status text not null default 'draft' check (status in ('draft','published','archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.members (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique references public.profiles(id) on delete cascade,
  full_name text not null,
  photo_url text,
  member_type text not null default 'student' check (member_type in ('student','alumni','professional','mentor')),
  university text,
  department text,
  batch text,
  profession text,
  company text,
  location text,
  skills text[] not null default '{}',
  linkedin_url text,
  mentor_available boolean not null default false,
  visibility text not null default 'members' check (visibility in ('public','members','private')),
  application_status text not null default 'pending' check (application_status in ('pending','approved','rejected','needs_info')),
  approved_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.event_registrations (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete set null,
  full_name text not null,
  email text not null,
  phone text,
  status text not null default 'registered' check (status in ('registered','waitlisted','cancelled','attended')),
  created_at timestamptz not null default now(),
  unique (event_id, email)
);

create table if not exists public.program_applications (
  id uuid primary key default gen_random_uuid(),
  program_id uuid not null references public.programs(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete set null,
  full_name text not null,
  email text not null,
  answers jsonb not null default '{}'::jsonb,
  status text not null default 'pending' check (status in ('pending','approved','rejected','needs_info')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.media (
  id uuid primary key default gen_random_uuid(),
  file_name text not null,
  storage_path text not null unique,
  mime_type text,
  size_bytes bigint,
  alt_text text,
  uploaded_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_by uuid references public.profiles(id) on delete set null,
  updated_at timestamptz not null default now()
);

create table if not exists public.partners (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  website_url text,
  logo_url text,
  partner_type text,
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.annual_reports (
  id uuid primary key default gen_random_uuid(),
  year integer not null unique,
  title text not null,
  summary text,
  file_url text,
  status text not null default 'draft' check (status in ('draft','published','archived')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.audit_logs (
  id bigint generated always as identity primary key,
  actor_id uuid references public.profiles(id) on delete set null,
  action text not null,
  entity_type text,
  entity_id text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create or replace function public.is_staff()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid()
      and role in ('super_admin','admin','editor','membership_manager','event_manager','program_manager','finance','contributor')
  );
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid()
      and role in ('super_admin','admin')
  );
$$;

alter table public.profiles enable row level security;
alter table public.pages enable row level security;
alter table public.categories enable row level security;
alter table public.articles enable row level security;
alter table public.programs enable row level security;
alter table public.events enable row level security;
alter table public.members enable row level security;
alter table public.event_registrations enable row level security;
alter table public.program_applications enable row level security;
alter table public.media enable row level security;
alter table public.site_settings enable row level security;
alter table public.partners enable row level security;
alter table public.annual_reports enable row level security;
alter table public.audit_logs enable row level security;

create policy "profiles own read" on public.profiles for select using (id = auth.uid() or public.is_staff());
create policy "profiles own update" on public.profiles for update using (id = auth.uid() or public.is_admin()) with check (id = auth.uid() or public.is_admin());

create policy "published pages public read" on public.pages for select using (status = 'published' or public.is_staff());
create policy "staff manage pages" on public.pages for all using (public.is_staff()) with check (public.is_staff());

create policy "categories public read" on public.categories for select using (true);
create policy "staff manage categories" on public.categories for all using (public.is_staff()) with check (public.is_staff());

create policy "published articles public read" on public.articles for select using (status = 'published' or public.is_staff());
create policy "staff manage articles" on public.articles for all using (public.is_staff()) with check (public.is_staff());

create policy "published programs public read" on public.programs for select using (status = 'published' or public.is_staff());
create policy "staff manage programs" on public.programs for all using (public.is_staff()) with check (public.is_staff());

create policy "published events public read" on public.events for select using (status = 'published' or public.is_staff());
create policy "staff manage events" on public.events for all using (public.is_staff()) with check (public.is_staff());

create policy "public approved members" on public.members for select using (
  (application_status = 'approved' and visibility = 'public')
  or user_id = auth.uid()
  or public.is_staff()
);
create policy "members own update" on public.members for update using (user_id = auth.uid() or public.is_staff()) with check (user_id = auth.uid() or public.is_staff());
create policy "authenticated membership apply" on public.members for insert with check (user_id = auth.uid());

create policy "registrants own read" on public.event_registrations for select using (user_id = auth.uid() or public.is_staff());
create policy "authenticated event registration" on public.event_registrations for insert with check (auth.uid() is not null and (user_id is null or user_id = auth.uid()));
create policy "staff manage registrations" on public.event_registrations for all using (public.is_staff()) with check (public.is_staff());

create policy "program applicants own read" on public.program_applications for select using (user_id = auth.uid() or public.is_staff());
create policy "authenticated program application" on public.program_applications for insert with check (auth.uid() is not null and (user_id is null or user_id = auth.uid()));
create policy "staff manage program applications" on public.program_applications for all using (public.is_staff()) with check (public.is_staff());

create policy "staff manage media" on public.media for all using (public.is_staff()) with check (public.is_staff());
create policy "settings public read" on public.site_settings for select using (true);
create policy "admins manage settings" on public.site_settings for all using (public.is_admin()) with check (public.is_admin());
create policy "active partners public read" on public.partners for select using (is_active or public.is_staff());
create policy "staff manage partners" on public.partners for all using (public.is_staff()) with check (public.is_staff());
create policy "published reports public read" on public.annual_reports for select using (status = 'published' or public.is_staff());
create policy "staff manage reports" on public.annual_reports for all using (public.is_staff()) with check (public.is_staff());
create policy "admins read audit logs" on public.audit_logs for select using (public.is_admin());
create policy "staff insert audit logs" on public.audit_logs for insert with check (public.is_staff());

create trigger profiles_set_updated_at before update on public.profiles for each row execute function public.set_updated_at();
create trigger pages_set_updated_at before update on public.pages for each row execute function public.set_updated_at();
create trigger articles_set_updated_at before update on public.articles for each row execute function public.set_updated_at();
create trigger programs_set_updated_at before update on public.programs for each row execute function public.set_updated_at();
create trigger events_set_updated_at before update on public.events for each row execute function public.set_updated_at();
create trigger members_set_updated_at before update on public.members for each row execute function public.set_updated_at();
create trigger program_applications_set_updated_at before update on public.program_applications for each row execute function public.set_updated_at();
create trigger partners_set_updated_at before update on public.partners for each row execute function public.set_updated_at();
create trigger annual_reports_set_updated_at before update on public.annual_reports for each row execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', new.email));
  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

insert into public.site_settings (key, value)
values
  ('site_identity', '{"name":"University Students'' Association of Shyamnagar","shortName":"USAS","domain":"usasbd.org"}'::jsonb),
  ('homepage', '{"featuredProgramId":null,"featuredEventId":null}'::jsonb)
on conflict (key) do nothing;
