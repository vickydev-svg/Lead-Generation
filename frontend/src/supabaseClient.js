import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tlqykkjokosucwbwfucs.supabase.co';
const supabaseAnonKey = 'sb_publishable_RScVK9ECrq8_rl1-wjRziw_QEECciLz';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
