-- Keep security-definer helper functions out of the exposed public API schema.

create schema if not exists private;

alter function public.set_updated_at() set search_path = pg_catalog, public;
alter function public.set_updated_at() set schema private;

alter function public.is_staff() set schema private;
alter function public.is_admin() set schema private;
alter function public.handle_new_user() set schema private;

revoke all on function private.handle_new_user() from public, anon, authenticated;
revoke all on function private.set_updated_at() from public, anon, authenticated;

revoke all on function private.is_staff() from public;
revoke all on function private.is_admin() from public;
grant usage on schema private to anon, authenticated;
grant execute on function private.is_staff() to anon, authenticated;
grant execute on function private.is_admin() to anon, authenticated;
