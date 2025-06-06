// ProyectoBD/frontend/src/components/ProductoTable.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductoTable = ({ reload, onEditProducto, onProductoEliminado }) => {
  const [productos, setProductos] = useState([]);

  const fetchProductos = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/productos");
      console.log(res.data);
      setProductos(res.data);
    } catch (err) {
      console.error("Error al obtener productos:", err);
      setProductos([]); // En caso de error, limpia la tabla para no mostrar datos incorrectos
    }
  };

  // Cargar productos cuando el componente se monta o `reload` cambia
  useEffect(() => {
    fetchProductos();
    // eslint-disable-next-line
  }, [reload]);

  const handleDelete = async (id) => {
    if (
      window.confirm("¿Estás seguro de que quieres eliminar este producto?")
    ) {
      try {
        await axios.delete(`http://localhost:3001/api/productos/${id}`);
        alert("Producto eliminado");
        onProductoEliminado(); // Recarga la tabla
      } catch (err) {
        alert("Error al eliminar el producto: " + err.message);
        console.error("Error completo:", err);
      }
    }
  };

  return (
    <table border="1" cellPadding="5" cellSpacing="0">
      <thead>
        <tr>
          <th>ID Producto</th>
          <th>Nombre</th>
          <th>Marca</th>
          <th>Tipo</th>
          <th>Uso</th>
          <th>Precio</th>
          <th>Cantidad</th>
          <th>Proveedor</th>
          <th>Fecha Caducidad</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {productos.length > 0 ? (
          productos.map((prod) => (
            <tr key={prod.id_producto}>
              <td>{prod.id_producto}</td>
              <td>{prod.nombre}</td>
              <td>{prod.marca}</td>
              <td>{prod.tipo}</td>
              <td>{prod.uso}</td>
              <td>{prod.precio}</td>
              <td>{prod.cantidad}</td>
              <td>{prod.id_proveedor}</td>
              <td>
                {prod.fecha_caducidad
                  ? new Date(prod.fecha_caducidad)
                      .toISOString()
                      .substring(0, 10)
                  : ""}
              </td>

              <td>
                <button onClick={() => onEditProducto(prod)}>Editar</button>
                <button
                  onClick={() => handleDelete(prod.id_producto)}
                  className="delete-button"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="10" style={{ textAlign: "center" }}>
              No hay productos disponibles.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default ProductoTable;
