// File: backend/src/controllers/readingsController.js

// 1. Pastikan import ini benar
import { supabase } from '../config/supabaseClient.js'; 

export class ReadingsController {

  static async list(req, res) {
    try {
      const { data, error } = await supabase
        .from('sensor_readings')
        .select('*')
        .order('recorded_at', { ascending: false }); 
      
      if (error) throw error;
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: 'Gagal mengambil readings', error: error.message });
    }
  }

  static async latest(req, res) {
    try {
      const { data, error } = await supabase
        .from('sensor_readings')
        .select('*')
        .order('recorded_at', { ascending: false })
        .limit(1)
        .single(); 
      
      if (error) throw error;
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: 'Gagal mengambil data terbaru', error: error.message });
    }
  }

  static async create(req, res) {
    try {
      const { temperature, threshold_value } = req.body; 
      
      if (temperature === undefined) {
         return res.status(400).json({ message: 'Properti "temperature" dibutuhkan' });
      }

      const { data, error } = await supabase
        .from('sensor_readings')
        .insert([
          { temperature, threshold_value }, 
        ])
        .select();
      
      if (error) throw error;
      res.status(201).json(data[0]); 
    } catch (error) {
      res.status(500).json({ message: 'Gagal membuat reading', error: error.message });
    }
  }

  /**
   * 2. Pastikan fungsi 'clear' ada di dalam class
   * Handler untuk: DELETE /api/readings
   */
  static async clear(req, res) {
    console.log('Menerima permintaan DELETE di /api/readings (controller)');
    try {
      const { data, error } = await supabase
        .from('sensor_readings')
        .delete()
        .not('id', 'is', null); // Hapus semua baris

      if (error) {
        console.error('Error Supabase:', error);
        throw error;
      }

      res.status(200).json({ message: 'Semua history berhasil dihapus', data });
    } catch (error) {
      res.status(500).json({ message: 'Gagal menghapus history', error: error.message });
    }
  }
} // <-- Pastikan 'clear' ada SEBELUM kurung tutup ini