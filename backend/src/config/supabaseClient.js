// File: backend/src/supabaseClient.js
// Deskripsi: File untuk koneksi database Supabase.

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Pastikan .env dimuat sebelum variabel dipakai
dotenv.config(); 

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  // Ini akan menghentikan server jika .env tidak diatur
  throw new Error("Supabase URL atau Key tidak di-set di file .env. Periksa file .env Anda.");
}

export const supabase = createClient(supabaseUrl, supabaseKey);