import Link from "next/link";
import { login } from "./actions";

type Props = {
  searchParams: Promise<{ error?: string }>;
};

const errorCopy: Record<string, string> = {
  missing: "Enter both email and password.",
  invalid: "The email or password is not valid.",
  unauthorized: "Your account does not have USAS admin access.",
};

export default async function AdminLoginPage({ searchParams }: Props) {
  const { error } = await searchParams;

  return (
    <main className="admin-auth">
      <section className="admin-auth-card">
        <Link className="admin-brand" href="/">
          <img src="/usas-mark.svg" alt="" width="34" height="46" />
          <strong>USAS</strong>
        </Link>
        <span className="admin-kicker">Administration</span>
        <h1>Sign in to manage USAS.</h1>
        <p>Content, community, programs, events and reporting will be managed from this workspace.</p>

        {error && <div className="admin-error" role="alert">{errorCopy[error] ?? "Could not sign in."}</div>}

        <form action={login} className="admin-form">
          <label>
            <span>Email</span>
            <input name="email" type="email" autoComplete="email" required />
          </label>
          <label>
            <span>Password</span>
            <input name="password" type="password" autoComplete="current-password" required />
          </label>
          <button type="submit">Sign in</button>
        </form>

        <Link className="admin-back" href="/">← Back to usasbd.org</Link>
      </section>
    </main>
  );
}
