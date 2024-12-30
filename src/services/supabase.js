import { createClient } from '@supabase/supabase-js';

export const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  'https://txxsnmejijdynesxaijs.supabase.co';
const supabaseKey =
  import.meta.env.VITE_SUPABASE_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4eHNubWVqaWpkeW5lc3hhaWpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ1OTk1OTQsImV4cCI6MjA1MDE3NTU5NH0.WohEIJ89kWMQOIFzbWbZcT6cjn-eHwFBGfI8TUTvL6E';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
