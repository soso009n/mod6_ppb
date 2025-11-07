import express from "express";
import { ReadingsController } from "../controllers/readingsController.js";

const router = express.Router();

router.get("/", ReadingsController.list);
router.post("/", ReadingsController.create);
router.get("/latest", ReadingsController.latest);

// --- TAMBAHKAN BARIS INI UNTUK MEMPERBAIKI ERROR ---
router.delete("/", ReadingsController.clear); // 'clear' adalah fungsi baru di controller Anda

export default router;