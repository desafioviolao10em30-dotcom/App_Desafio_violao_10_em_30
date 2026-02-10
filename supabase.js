import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = 'https://npxgzneiemntoedhdbca.supabase.co';
const SUPABASE_ANON_KEY = 'SUA_ANON_PUBLIC_KEY_AQUI';

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);
