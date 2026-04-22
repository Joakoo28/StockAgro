import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'PEGA_TU_SUPABASE_URL'
const supabaseAnonKey = 'PEGA_TU_SUPABASE_ANON_KEY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
