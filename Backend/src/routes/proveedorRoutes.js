// Backend/src/routes/proveedorRoutes.js
import express from "express";
const router = express.Router();
import ProveedorController from "../controllers/proveedorController.js";

// Ruta para obtener todos los proveedores
router.get("/", ProveedorController.getAllProveedores);

export default router;
