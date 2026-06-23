import { createBrowserClient } from '@supabase/ssr'

export const createClient = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Jika URL kosong atau masih berupa placeholder bawaan, gunakan mock client untuk mencegah crash
  if (!url || !anonKey || url.includes('your-supabase-project-id') || anonKey.includes('your-anon-public-key')) {
    return {
      auth: {
        getUser: async () => ({ data: { user: null }, error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
        signOut: async () => {},
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
    return createBrowserClient(url, anonKey)
  } catch (err) {
    console.error('Gagal menginisialisasi Supabase Client:', err)
    return {
      auth: {
        getUser: async () => ({ data: { user: null }, error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
        signOut: async () => {},
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
