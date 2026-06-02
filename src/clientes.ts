import readlineSync from "readline-sync";
import pool from "./db";

export async function cadastrarCliente() {
  const nome = readlineSync.question("Nome do cliente: ");
  const telefone = readlineSync.question("Telefone: ");
  const endereco = readlineSync.question("Endereço: ");

  await pool.query(
    "INSERT INTO clientes (nome, telefone, endereco) VALUES ($1, $2, $3)",
    [nome, telefone, endereco]
  );
  console.log("Cliente cadastrado com sucesso!");
}

export async function listarClientes() {
  const result = await pool.query("SELECT * FROM clientes");
  console.table(result.rows);
}

