import Link from "next/link";
import { activateFirstAdmin } from "./actions";

type Props = {
  searchParams: Promise<{ error?: string; status?: string }>;
};

const errorCopy: Record<string, string> = {
  missing: "Enter both email and password.",
  auth: "Could not create or sign in to this account.",
  locked: "A USAS admin already exists, or this account cannot be promoted.",
};

export default async function AdminSetupPage({ searchParams }: Props) {
  const { error, status } = await searchParams;

  return (
    <main className="admin-auth">
      <section className="admin-auth-card">
        <Link className="admin-brand" href="/">
          <img src="/usas-mark.svg" alt="" width="34" height="46" />
          <strong>USAS</strong>
        </Link>

        <span className="admin-kicker">First-time setup</span>
        <h1>Activate the first administrator.</h1>
        <p>
          This screen only works before another staff account exists. Your password is submitted
          directly to Supabase and is never stored in the USAS database.
        </p>

        {error && <div className="admin-error" role="alert">{errorCopy[error] ?? "Setup failed."}</div>}

        {status === "confirm-email" && (
          <div className="admin-notice" role="status">
            Check your email and confirm the account, then return here and submit the same email and password once more.
          </div>
        )}

        <form action={activateFirstAdmin} className="admin-form">
          <label>
            <span>Email</span>
            <input name="email" type="email" autoComplete="email" required />
          </label>
          <label>
            <span>Password</span>
            <input name="password" type="password" autoComplete="new-password" minLength={8} required />
          </label>
          <button type="submit">Activate Super Admin</button>
        </form>

        <Link className="admin-back" href="/admin/login">Already activated? Sign in</Link>
      </section>
    </main>
  );
}
