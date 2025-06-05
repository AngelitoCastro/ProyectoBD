import express from "express";
const router = express.Router();
import ProductoController from "../controllers/productoController.js";

// Rutas CRUD
router.get("/", ProductoController.getAllProductos);
router.post("/", ProductoController.createProducto);
router.put("/:id", ProductoController.updateProducto);
router.delete("/:id", ProductoController.deleteProducto);

export default router;
