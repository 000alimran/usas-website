create or replace function private.has_staff()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.profiles
    where role in (
      'super_admin',
      'admin',
      'editor',
      'membership_manager',
      'event_manager',
      'program_manager',
      'finance',
      'contributor'
    )
  );
$$;

revoke all on function private.has_staff() from public;
grant execute on function private.has_staff() to authenticated;

drop policy if exists "bootstrap first admin" on public.profiles;
create policy "bootstrap first admin"
on public.profiles
for update
to authenticated
using (
  id = (select auth.uid())
  and role = 'member'
  and not private.has_staff()
)
with check (
  id = (select auth.uid())
  and role = 'super_admin'
  and not private.has_staff()
);

create index if not exists articles_author_id_idx on public.articles(author_id);
create index if not exists articles_category_id_idx on public.articles(category_id);
create index if not exists audit_logs_actor_id_idx on public.audit_logs(actor_id);
create index if not exists event_registrations_user_id_idx on public.event_registrations(user_id);
create index if not exists media_uploaded_by_idx on public.media(uploaded_by);
create index if not exists pages_created_by_idx on public.pages(created_by);
create index if not exists pages_updated_by_idx on public.pages(updated_by);
create index if not exists program_applications_program_id_idx on public.program_applications(program_id);
create index if not exists program_applications_user_id_idx on public.program_applications(user_id);
create index if not exists site_settings_updated_by_idx on public.site_settings(updated_by);
