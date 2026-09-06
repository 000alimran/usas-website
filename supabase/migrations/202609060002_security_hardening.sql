-- Security hardening for Dynamic V1.
-- Prevent self-service privilege escalation through profile roles or membership approval state.

drop policy if exists "profiles own update" on public.profiles;
drop policy if exists "admins manage profiles" on public.profiles;
create policy "admins manage profiles"
on public.profiles
for update
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "members own update" on public.members;
drop policy if exists "staff manage members" on public.members;
create policy "staff manage members"
on public.members
for update
using (public.is_staff())
with check (public.is_staff());

drop policy if exists "authenticated membership apply" on public.members;
create policy "authenticated membership apply"
on public.members
for insert
with check (
  user_id = auth.uid()
  and application_status = 'pending'
  and approved_at is null
);

drop policy if exists "authenticated event registration" on public.event_registrations;
create policy "authenticated event registration"
on public.event_registrations
for insert
with check (
  auth.uid() is not null
  and (user_id is null or user_id = auth.uid())
  and status = 'registered'
);

drop policy if exists "authenticated program application" on public.program_applications;
create policy "authenticated program application"
on public.program_applications
for insert
with check (
  auth.uid() is not null
  and (user_id is null or user_id = auth.uid())
  and status = 'pending'
);
