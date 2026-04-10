import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hjmnlyremjvkqpsbhlbw.supabase.co';
const supabaseKey = 'sb_publishable_8PJmBVVOU3Flf-RKTPJFiQ_TmvIr5mT';

export const supabase = createClient(supabaseUrl, supabaseKey);
