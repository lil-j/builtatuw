import {createClient} from "@supabase/supabase-js";

export const supabase = createClient(process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY)

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;