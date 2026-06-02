import readlineSync from "readline-sync";
import pool from "./db";

export async function registrarVenda() {
  const clienteId = readlineSync.questionInt("ID do cliente: ");
  let total = 0;

  const pedido = await pool.query(
    "INSERT INTO pedidos (cliente_id, total) VALUES ($1, $2) RETURNING id",
    [clienteId, total]
  );
  const pedidoId = pedido.rows[0].id;

  while(true) {
    const produtoId = readlineSync.questionInt("ID do produto (0 para finalizar): ");
    if(produtoId === 0) break;

    const quantidade = readlineSync.questionInt("Quantidade: ");
    const produto = await pool.query("SELECT preco, estoque FROM produtos WHERE id=$1", [produtoId]);

    if(produto.rows.length === 0) {
      console.log("Produto não encontrado.");
      continue;
    }

    if(produto.rows[0].estoque < quantidade) {
      console.log("Estoque insuficiente.");
      continue;
    }

    const precoUnitario = produto.rows[0].preco;
    total += quantidade * precoUnitario;

    await pool.query(
      "INSERT INTO itens_pedido (pedido_id, produto_id, quantidade, preco_unitario) VALUES ($1, $2, $3, $4)",
      [pedidoId, produtoId, quantidade, precoUnitario]
    );

    await pool.query(
      "UPDATE produtos SET estoque = estoque - $1 WHERE id=$2",
      [quantidade, produtoId]
    );
  }

  await pool.query("UPDATE pedidos SET total=$1 WHERE id=$2", [total, pedidoId]);
  console.log(`Venda registrada com sucesso! Total: R$${total.toFixed(2)}`);
}

export async function listarPedidos() {
  const result = await pool.query("SELECT * FROM pedidos");
  console.table(result.rows);
}

