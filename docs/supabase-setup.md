# Supabase setup (Phase 0.2)

Do these once. Nothing here goes into git except the two public values in GitHub Actions variables.

## 1. Create the project

1. https://supabase.com -> sign in (GitHub is easiest) -> **New project**, free plan.
2. Name `StressFreeBudget`, pick the region nearest you (US East), generate a strong database password and
   save it in a password manager. You rarely need it again.

## 2. Copy the two public values

Project **Settings -> API Keys** (or the **Connect** button):

- **Project URL**, like `https://abcdxyz.supabase.co`
- **anon / publishable key** (`eyJ...` or `sb_publishable_...`)

Never use the `service_role` / secret key in this app, never paste it anywhere, and never commit it.

## 3. Email code sign-in (6 digits)

**Authentication -> Providers -> Email**: enabled. Leave "Confirm email" on.

**Authentication -> Email Templates**: edit both **Confirm signup** and **Magic Link** so the body shows the code
instead of a link, for example:

```
<h2>Your StressFreeBudget code</h2>
<p>Enter this code to sign in:</p>
<p style="font-size:28px;letter-spacing:6px"><strong>{{ .Token }}</strong></p>
<p>It expires in 1 hour. If you didn't ask for it, ignore this email.</p>
```

Both templates are needed: new users get "Confirm signup", returning users get "Magic Link".

**Authentication -> URL Configuration**

- Site URL: `https://mekhi1green.github.io/StressFreeBudget/`
- Redirect URLs: add `http://localhost:5173/**` and `https://mekhi1green.github.io/StressFreeBudget/**`

Notes: the free built-in email sender is rate limited (a few emails per hour), which is fine for two people.
After both of you have signed in once, turn off **Authentication -> Sign In / Providers -> Allow new users to
sign up** so nobody else can create an account.

## 4. Give the values to the app

- **Local:** copy `.env.example` to `.env.local` and fill in `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
- **Deployed site:** GitHub repo -> **Settings -> Secrets and variables -> Actions -> Variables tab** ->
  **New repository variable**, add the same two names and values. (Variables, not secrets: they are public by design.)
  Then re-run **Deploy to GitHub Pages**.

## 5. Check it worked

Run `npm run dev`. The status line under the theme switch should say **Backend connected** (green dot).
The deployed site should say the same after the re-run.
