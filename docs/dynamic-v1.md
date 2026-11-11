# USAS Dynamic V1

This branch migrates USAS from a static GitHub Pages build to a server-capable Next.js application backed by Supabase.

## Safety rule

`main` remains the current production/static site until Dynamic V1 is verified on a preview deployment. Do not point `usasbd.org` away from GitHub Pages until the Vercel preview, authentication, database migrations and SEO route parity have been checked.

## Stack

- Next.js 16 App Router
- Vercel runtime
- Supabase PostgreSQL
- Supabase Auth with cookie-based SSR
- Supabase Storage in the media phase
- GitHub as source control

## Phase 1 scope

1. Supabase project and environment variables
2. Database schema + Row Level Security
3. Admin authentication
4. `/admin` workspace
5. Dynamic articles / knowledge
6. Dynamic events + registrations
7. Dynamic membership applications
8. Dynamic programs
9. Dynamic sitemap / metadata verification
10. Vercel preview, then production cutover

## Environment variables

```text
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
```

Never commit private service-role or secret keys to the repository.

## Initial database modules

- profiles + roles
- pages
- categories
- articles
- programs + applications
- events + registrations
- members
- media metadata
- site settings
- partners
- annual reports
- audit logs

The migration lives in `supabase/migrations/202609060001_dynamic_v1.sql`.

## Auth model

The public website stays public. Only `/admin/*` is authentication-gated. Supabase `getClaims()` is used to validate identity and RLS remains the final authorization boundary for database access.

## Production cutover checklist

- [ ] Supabase migration applied
- [ ] Security and performance advisors reviewed
- [ ] First super admin created
- [ ] Vercel project connected to `dynamic-v1`
- [ ] Environment variables configured in Vercel
- [ ] Preview build/typecheck passes
- [ ] Existing public URLs render correctly
- [ ] Admin login and role checks verified
- [ ] Sitemap and robots verified
- [ ] Custom domain added to Vercel
- [ ] DNS switched only after preview approval
- [ ] HTTPS verified
- [ ] GitHub Pages retired only after cutover
