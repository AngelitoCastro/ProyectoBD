import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jfzdvzuwggbctawfsckz.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmemR2enV3Z2diY3Rhd2ZzY2t6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkwOTIzMzYsImV4cCI6MjA2NDY2ODMzNn0.404jtFLHpaKJqo73WJysqDhUqZzbUNq3Q0NOoSCcwpo";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
