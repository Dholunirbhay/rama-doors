import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://daxnaajkagcbrijfysrk.supabase.co';

const supabaseAnonKey = 'sb_publishable_4atXI_Kvkbb17xkAr660FA_dSybzWsb';

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);