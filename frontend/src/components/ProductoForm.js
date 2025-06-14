// ProyectoBD/frontend/src/components/ProductoForm.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const initialState = {
  idProducto: null,
  nombre: "",
  marca: "",
  tipo: "",
  uso: "",
  precio: "",
  cantidad: "",
  fecha_caducidad: "",
  proveedor: "",
};

const ProductoForm = ({
  onProductoGuardado,
  editingProduct,
  setEditingProduct,
}) => {
  const [form, setForm] = useState(initialState);
  const [proveedores, setProveedores] = useState([]);

  // <-- 2. Cargar la lista de proveedores al montar el componente
  useEffect(() => {
    const fetchProveedores = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/proveedores");
        setProveedores(res.data);
      } catch (err) {
        console.error("Error al obtener proveedores:", err);
      }
    };
    fetchProveedores();
  }, []);

  // Carga el producto en el formulario cuando `editingProduct` cambia
  useEffect(() => {
    if (editingProduct) {
      setForm({
        idProducto: editingProduct.id_producto,
        nombre: editingProduct.nombre,
        marca: editingProduct.marca,
        tipo: editingProduct.tipo,
        uso: editingProduct.uso,
        precio: editingProduct.precio,
        cantidad: editingProduct.cantidad,
        // Formatear la fecha para el input type="date"
        fecha_caducidad: editingProduct.fecha_caducidad
          ? new Date(editingProduct.fecha_caducidad)
              .toISOString()
              .substring(0, 10)
          : "",
        proveedor: editingProduct.id_proveedor,
      });
    } else {
      setForm(initialState); // Limpia el formulario si no hay producto editando
    }
  }, [editingProduct]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (form.idProducto) {
        // Modo edición: PUT request
        await axios.put(
          `http://localhost:3001/api/productos/${form.idProducto}`,
          form
        );
        alert("Producto actualizado");
      } else {
        // Modo creación: POST request
        const res = await axios.post(
          "http://localhost:3001/api/productos",
          form
        );
        console.log(res.data);
        alert("Producto creado");
      }
      onProductoGuardado(); // Llama para recargar la tabla y limpiar el formulario
    } catch (err) {
      alert("Error al guardar o actualizar: " + err.message);
      console.error("Error completo:", err);
    }
  };

  const handleClearForm = () => {
    setEditingProduct(null); // Limpia el estado de edición en App.js
    setForm(initialState); // Limpia el formulario localmente
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        {form.idProducto && (
          <div className="form-group">
            <label htmlFor="idProducto">ID Producto:</label>
            <input
              id="idProducto"
              name="idProducto"
              value={form.idProducto}
              disabled
            />
          </div>
        )}
        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input
            id="nombre"
            name="nombre"
            placeholder="Nombre"
            value={form.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="marca">Marca:</label>
          <input
            id="marca"
            name="marca"
            placeholder="Marca"
            value={form.marca}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="tipo">Tipo:</label>
          <input
            id="tipo"
            name="tipo"
            placeholder="Tipo"
            value={form.tipo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="uso">Uso:</label>
          <input
            id="uso"
            name="uso"
            placeholder="Uso"
            value={form.uso}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="precio">Precio:</label>
          <input
            id="precio"
            name="precio"
            placeholder="Precio"
            value={form.precio}
            onChange={handleChange}
            required
            type="number"
            step="0.01"
          />
        </div>
        <div className="form-group">
          <label htmlFor="cantidad">Cantidad:</label>
          <input
            id="cantidad"
            name="cantidad"
            placeholder="Cantidad"
            value={form.cantidad}
            onChange={handleChange}
            required
            type="number"
          />
        </div>
        <div className="form-group">
          <label htmlFor="fecha_caducidad">Fecha Caducidad:</label>
          <input
            id="fecha_caducidad"
            name="fecha_caducidad"
            placeholder="Fecha Caducidad"
            value={form.fecha_caducidad}
            onChange={handleChange}
            required
            type="date"
          />
        </div>
        <div className="form-group">
          <label htmlFor="proveedor">Proveedor:</label>
          <select
            id="proveedor"
            name="proveedor"
            value={form.proveedor}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un proveedor</option>
            {proveedores.map((p) => (
              <option key={p.id_proveedor} value={p.id_proveedor}>
                {p.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="form-buttons">
          <button type="submit">
            {form.idProducto ? "Actualizar" : "Guardar"}
          </button>
          {form.idProducto && (
            <button
              type="button"
              onClick={handleClearForm}
              className="clear-button"
            >
              Limpiar Formulario
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProductoForm;
