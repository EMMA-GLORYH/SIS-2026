import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // This helps catch the error if your .env.local isn't loading
  console.error("Supabase environment variables are missing!");
}

// Ensure the word 'export' is present here
export const supabase = createClient(
  supabaseUrl || '', 
  supabaseAnonKey || ''
);