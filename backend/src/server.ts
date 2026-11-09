import express from "express";
import veiculoRoutes from "./routes/veiculo.routes.js";

const app = express();

const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API de Controle de Veículos está funcionando!");
});

app.use("/veiculos", veiculoRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log(`Rota de veículos: http://localhost:${PORT}/veiculos`);
});