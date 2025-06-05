import { supabase } from "../db/connection.js";

export default class ProductoController {
  // Obtener todos los productos
  static async getAllProductos(req, res) {
    try {
      const { data, error } = await supabase.from("productos").select("*");

      if (error) {
        throw error;
      }
      console.log(data);
      res.json(data);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  // Crear un producto
  static async createProducto(req, res) {
    try {
      const {
        nombre,
        marca,
        tipo,
        uso,
        precio,
        cantidad,
        fecha_caducidad,
        proveedor,
      } = req.body;
      console.log(req.body);

      const { data, error } = await supabase.from("productos").insert([
        {
          nombre,
          marca,
          tipo,
          uso,
          precio,
          cantidad,
          fecha_caducidad,
        },
      ]);
      if (error) {
        console.error("Error al crear producto:", error);
        throw error;
      }
      res.status(201).send("Producto creado");
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  // Actualizar un producto
  static async updateProducto(req, res) {
    try {
      const { id } = req.params;
      const {
        nombre,
        marca,
        tipo,
        uso,
        precio,
        cantidad,
        fecha_caducidad,
        proveedor,
      } = req.body;
      const { data, error } = await supabase
        .from("productos")
        .update({
          nombre,
          marca,
          tipo,
          uso,
          precio,
          cantidad,
          fecha_caducidad,
          proveedor,
        })
        .eq("IdProducto", id);
      res.send("Producto actualizado");
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  // Eliminar un producto
  static async deleteProducto(req, res) {
    try {
      const { id } = req.params;
      const { data, error } = await supabase
        .from("productos")
        .delete()
        .eq("IdProducto", id);
      res.send("Producto eliminado");
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
}
