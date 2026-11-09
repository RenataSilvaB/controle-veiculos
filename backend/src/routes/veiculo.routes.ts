import { Router } from "express";
import { Veiculo } from "../types/veiculo.js";

const router = Router();

// Lista inicial de veículos
const veiculos: Veiculo[] = [
  {
    id: 1,
    marca: "Toyota",
    modelo: "Corolla",
    ano: 2024,
    placa: "ABC1D23",
    cor: "Preto",
    status: "Disponível"
  },
  {
    id: 2,
    marca: "Honda",
    modelo: "Civic",
    ano: 2023,
    placa: "DEF4G56",
    cor: "Branco",
    status: "Vendido"
  }
];

// GET - Listar veículos
router.get("/", (req, res) => {
  res.json(veiculos);
});

// POST - Cadastrar veículo
router.post("/", (req, res) => {
  const novoVeiculo: Veiculo = {
    ...req.body,
    id: veiculos.length > 0
      ? Math.max(...veiculos.map((veiculo) => veiculo.id)) + 1
      : 1
  };

  veiculos.push(novoVeiculo);

  res.status(201).json(novoVeiculo);
});

// PUT - Atualizar veículo
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);

  const indice = veiculos.findIndex(
    (veiculo) => veiculo.id === id
  );

  if (indice === -1) {
    return res.status(404).json({
      mensagem: "Veículo não encontrado."
    });
  }

  const veiculoAtualizado: Veiculo = {
    ...veiculos[indice],
    ...req.body,
    id
  };

  veiculos[indice] = veiculoAtualizado;

  res.json(veiculoAtualizado);
});


// DELETE - Excluir veículo
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  const indice = veiculos.findIndex(
    (veiculo) => veiculo.id === id
  );

  if (indice === -1) {
    return res.status(404).json({
      mensagem: "Veículo não encontrado."
    });
  }

  veiculos.splice(indice, 1);

  res.json({
    mensagem: "Veículo excluído com sucesso!"
  });
});


export default router;