// Backend/src/controllers/proveedorController.js
import { supabase } from "../db/connection.js";

export default class ProveedorController {
  // Obtener todos los proveedores
  static async getAllProveedores(req, res) {
    try {
      const { data, error } = await supabase.from("proveedores").select("*");

      if (error) {
        throw error;
      }
      res.json(data);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
}
