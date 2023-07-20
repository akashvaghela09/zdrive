import { createClient } from '@supabase/supabase-js'

const {
    REACT_APP_BASE_URL,
    REACT_APP_SUPABASE_KEY
} = process.env;

// Supabase
const supabaseUrl = REACT_APP_BASE_URL;
const supabaseKey = REACT_APP_SUPABASE_KEY;

// Create a new instance of Supabase
const supabase = createClient(supabaseUrl, supabaseKey)

export { supabase };