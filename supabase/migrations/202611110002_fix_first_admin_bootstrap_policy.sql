create or replace function private.has_other_staff()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.profiles
    where id <> (select auth.uid())
      and role in (
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

revoke all on function private.has_other_staff() from public;
grant execute on function private.has_other_staff() to authenticated;

drop policy if exists "bootstrap first admin" on public.profiles;
create policy "bootstrap first admin"
on public.profiles
for update
to authenticated
using (
  id = (select auth.uid())
  and role = 'member'
  and not private.has_other_staff()
)
with check (
  id = (select auth.uid())
  and role = 'super_admin'
  and not private.has_other_staff()
);

drop function if exists private.has_staff();
