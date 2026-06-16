import { createClient } from '@supabase/supabase-js'

let supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
let supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

// Bersihkan string dari spasi di awal/akhir
supabaseUrl = supabaseUrl.trim()
supabaseAnonKey = supabaseAnonKey.trim()

// Tambahkan protokol https:// secara otomatis jika tidak ada
if (supabaseUrl && !supabaseUrl.startsWith('http://') && !supabaseUrl.startsWith('https://')) {
  supabaseUrl = `https://${supabaseUrl}`
}

// Hilangkan tanda '/' (trailing slash) di akhir URL jika ada
if (supabaseUrl.endsWith('/')) {
  supabaseUrl = supabaseUrl.slice(0, -1)
}

export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null
