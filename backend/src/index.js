import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import readingsRoutes from "./routes/readingsRoutes.js";
import thresholdsRoutes from "./routes/thresholdsRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/readings", readingsRoutes);
app.use("/api/thresholds", thresholdsRoutes);

const port = process.env.PORT || 5000;

// ENDPOINT BARU UNTUK HAPUS HISTORY
app.delete('/api/history', async (req, res) => {
  console.log('Menerima permintaan DELETE di /api/history');
  try {
    // Menghapus semua baris dari tabel 'sensor_readings'
    // dengan mencocokkan semua baris yang 'id'-nya tidak null
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
});
app.listen(port, '0.0.0.0', () => {
  console.log(`Backend server running on port ${port}`);
});
