// ProyectoBD/Backend/src/app.js
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import productoRoutes from "./routes/productoRoutes.js";
import proveedorRoutes from "./routes/proveedorRoutes.js";

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Importa las rutas (que a su vez importan la conexión)

app.use("/api/productos", productoRoutes);
app.use("/api/proveedores", proveedorRoutes);

app.get("/", (req, res) => {
  res.send("API funcionando");
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
