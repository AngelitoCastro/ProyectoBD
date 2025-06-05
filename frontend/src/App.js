// ProyectoBD/frontend/src/App.js
import React, { useState } from "react";
import ProductoForm from "./components/ProductoForm";
import ProductoTable from "./components/ProductoTable";

function App() {
  const [reload, setReload] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleProductoGuardado = () => {
    setReload(!reload); // Recarga la tabla
    setEditingProduct(null); // Limpia el formulario después de guardar/actualizar
  };

  // Función para cargar un producto en el formulario para edición
  const handleEditProducto = (product) => {
    setEditingProduct(product);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ color: "#0a3d62" }}>LALA SPA</h1>
      <ProductoForm
        onProductoGuardado={handleProductoGuardado}
        editingProduct={editingProduct}
        setEditingProduct={setEditingProduct}
      />
      <ProductoTable
        reload={reload}
        onEditProducto={handleEditProducto}
        onProductoEliminado={handleProductoGuardado}
      />
    </div>
  );
}

export default App;
