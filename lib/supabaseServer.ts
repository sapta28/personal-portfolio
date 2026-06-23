import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export const createClient = async () => {
  const cookieStore = await cookies()
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Jika URL kosong atau masih berupa placeholder bawaan, gunakan mock client untuk mencegah crash
  if (!url || !anonKey || url.includes('your-supabase-project-id') || anonKey.includes('your-anon-public-key')) {
    return {
      auth: {
        getUser: async () => ({ data: { user: null }, error: null }),
      },
      from: () => ({
        select: () => ({
          order: () => ({
            limit: () => Promise.resolve({ data: [], error: null }),
            eq: () => ({
              single: () => Promise.resolve({ data: null, error: null })
            })
          }),
          eq: () => ({
            single: () => Promise.resolve({ data: null, error: null })
          })
        })
      })
    } as any
  }

  try {
    return createServerClient(url, anonKey, {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method can be called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    })
  } catch (err) {
    console.error('Gagal menginisialisasi Supabase Server Client:', err)
    return {
      auth: {
        getUser: async () => ({ data: { user: null }, error: null }),
      },
      from: () => ({
        select: () => ({
          order: () => ({
            limit: () => Promise.resolve({ data: [], error: null }),
            eq: () => ({
              single: () => Promise.resolve({ data: null, error: null })
            })
          }),
          eq: () => ({
            single: () => Promise.resolve({ data: null, error: null })
          })
        })
      })
    } as any
  }
}
