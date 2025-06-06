// Backend/src/controllers/productoController.js
import { supabase } from "../db/connection.js";

export default class ProductoController {
  // Obtener todos los productos llamando a la función de la BD
  static async getAllProductos(req, res) {
    try {
      // ANTERIORMENTE: supabase.from("productos").select(...)
      // AHORA: Llamamos a la función `buscar_producto` sin parámetros para obtener todos.
      const { data, error } = await supabase.rpc("buscar_producto");

      if (error) {
        throw error;
      }
      res.json(data);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  // Crear un producto llamando a la función de la BD
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
        proveedor, // Este es el id_proveedor
      } = req.body;

      // ANTERIORMENTE: supabase.from("productos").insert(...)
      // AHORA: Llamamos a `guardar_producto` y pasamos los valores como parámetros.
      // ¡IMPORTANTE! Los nombres de los parámetros deben coincidir con los de tu función en la BD.
      const { error } = await supabase.rpc("guardar_producto", {
        _nombre: nombre,
        _marca: marca,
        _tipo: tipo,
        _uso: uso,
        _precio: precio,
        _cantidad: cantidad,
        _fecha_caducidad: fecha_caducidad,
        _id_proveedor: proveedor,
      });

      if (error) {
        console.error("Error al crear producto:", error);
        throw error;
      }
      res.status(201).send("Producto creado con procedimiento");
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  // Actualizar un producto llamando a la función de la BD
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

      // ANTERIORMENTE: supabase.from("productos").update(...)
      // AHORA: Llamamos a `actualizar_producto`.
      const { error } = await supabase.rpc("actualizar_producto", {
        p_id_producto: id,
        p_nombre: nombre,
        p_marca: marca,
        p_tipo: tipo,
        p_uso: uso,
        p_precio: precio,
        p_cantidad: cantidad,
        p_fecha_caducidad: fecha_caducidad,
        p_id_proveedor: proveedor,
      });

      if (error) {
        throw error;
      }
      res.send("Producto actualizado con procedimiento");
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  // Eliminar un producto llamando a la función de la BD
  static async deleteProducto(req, res) {
    try {
      const { id } = req.params;

      // ANTERIORMENTE: supabase.from("productos").delete(...)
      // AHORA: Llamamos a `eliminar_producto`.
      const { error } = await supabase.rpc("eliminar_producto", {
        _id_producto: id,
      });

      if (error) {
        throw error;
      }
      res.send("Producto eliminado con procedimiento");
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
}
