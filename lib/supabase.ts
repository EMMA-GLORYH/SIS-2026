import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // This helps catch the error if your .env.local isn't loading
  console.error("Supabase environment variables are missing!");
}

// createBrowserClient from @supabase/ssr automatically stores the
// PKCE code verifier in cookies so the server-side callback can read it
export const supabase = createBrowserClient(
  supabaseUrl || '',
  supabaseAnonKey || ''
);