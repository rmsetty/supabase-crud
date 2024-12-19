import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
    "https://yastlukrqetxagaqindk.supabase.co", 
    
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlhc3RsdWtycWV0eGFnYXFpbmRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQwOTIzNjgsImV4cCI6MjA0OTY2ODM2OH0.n8_wKwmRriND6jCC3CLU3En6kmN9fG_T2qEoPCd5mt0"
    )