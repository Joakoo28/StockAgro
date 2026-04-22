import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ynntkvjddopzrayvvwaw.supabase.co'
const supabaseAnonKey = 'sb_publishable_-6ckqqH3PwBOJ-JwQrhDPA_s8LclPGC'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
