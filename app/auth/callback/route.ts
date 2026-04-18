import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) { return cookieStore.get(name)?.value },
          set(name: string, value: string, options: any) {
            cookieStore.set({ name, value, ...options })
          },
          remove(name: string, options: any) {
            cookieStore.delete({ name, ...options })
          },
        },
      }
    )

    // Attempt the exchange
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      const user = data.user;

      // 1. Check for Admin email specifically
      if (user?.email === 'emmanuelhienwo@gmail.com') {
        return NextResponse.redirect(`${origin}/notifications`)
      }

      // 2. Metadata/Onboarding Check
      if (!user?.user_metadata?.full_name && !user?.user_metadata?.name) {
        return NextResponse.redirect(`${origin}/onboarding`)
      }

      // 3. Success for clients
      return NextResponse.redirect(`${origin}${next}`)
    } else {
      // THIS WILL SHOW IN YOUR TERMINAL - Look for this!
      console.error("Auth Exchange Error:", error.message);
    }
  }

  // Fallback if code is missing or exchange failed
  return NextResponse.redirect(`${origin}/login?error=auth_failed`)
}