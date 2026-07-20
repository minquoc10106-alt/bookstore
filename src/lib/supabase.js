import { createClient } from '@supabase/supabase-js';

const getSupabaseConfig = () => {
  const localUrl = localStorage.getItem('bv2_supabase_url');
  const localKey = localStorage.getItem('bv2_supabase_key');

 const supabaseUrl = 'https://futtyurmfkuhzgamxmma.supabase.co';
 const supabaseAnonKey = 'sb_publishable_z2kj14n2C87quRad-DqBjQ_f5yATXSb';

  const isConfigured = Boolean(
    supabaseUrl && 
    supabaseAnonKey && 
    supabaseUrl !== 'https://your-supabase-project-id.supabase.co' &&
    !supabaseUrl.includes('your-supabase-project-id')
  );

  return { supabaseUrl, supabaseAnonKey, isConfigured };
};

const config = getSupabaseConfig();

export const supabase = config.isConfigured
  ? createClient(config.supabaseUrl, config.supabaseAnonKey)
  : createClient('https://placeholder-project.supabase.co', 'placeholder-anon-key');

export const isSupabaseConnected = () => config.isConfigured;

export const updateSupabaseCredentials = (url, key) => {
  if (url && key) {
    localStorage.setItem('bv2_supabase_url', url.trim());
    localStorage.setItem('bv2_supabase_key', key.trim());
    window.location.reload();
  }
};

export const clearSupabaseCredentials = () => {
  localStorage.removeItem('bv2_supabase_url');
  localStorage.removeItem('bv2_supabase_key');
  window.location.reload();
};
