import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://tcpygydqvycpfkfjxicc.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjcHlneWRxdnljcGZrZmp4aWNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODgyMTg5MTYsImV4cCI6MjAwMzc5NDkxNn0.L0vCR4l5rRWCs3EZnWTGYs_EcZZYhsUDRalbGY_g-mc";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
