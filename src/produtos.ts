import readlineSync from "readline-sync";
import pool from "./db";

export async function cadastrarProduto() {
  const nome = readlineSync.question("Nome do produto: ");
  const preco = readlineSync.questionFloat("Preço: ");
  const estoque = readlineSync.questionInt("Estoque inicial: ");

  await pool.query(
    "INSERT INTO produtos (nome, preco, estoque) VALUES ($1, $2, $3)",
    [nome, preco, estoque]
  );
  console.log("Produto cadastrado com sucesso!");
}

export async function listarProdutos() {
  const result = await pool.query("SELECT * FROM produtos");
  console.table(result.rows);
}

