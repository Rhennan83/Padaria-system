import pool from "./db";

export async function relatorioGerente() {
  // Faturamento total
  const faturamento = await pool.query("SELECT SUM(total) AS faturamento_total FROM pedidos");
  console.log(`Faturamento total: R$${faturamento.rows[0].faturamento_total || 0}`);

  // Produtos com estoque baixo
  const estoqueBaixo = await pool.query("SELECT * FROM produtos WHERE estoque < 5");
  console.log("\nProdutos com estoque baixo:");
  console.table(estoqueBaixo.rows);

  // Clientes mais ativos
  const clientesAtivos = await pool.query(`
    SELECT c.nome, COUNT(p.id) AS total_pedidos
    FROM clientes c
    JOIN pedidos p ON c.id = p.cliente_id
    GROUP BY c.nome
    ORDER BY total_pedidos DESC
  `);
  console.log("\nClientes mais ativos:");
  console.table(clientesAtivos.rows);

  // Produtos mais vendidos
  const produtosVendidos = await pool.query(`
    SELECT pr.nome, SUM(i.quantidade) AS total_vendido
    FROM itens_pedido i
    JOIN produtos pr ON i.produto_id = pr.id
    GROUP BY pr.nome
    ORDER BY total_vendido DESC
  `);
  console.log("\nProdutos mais vendidos:");
  console.table(produtosVendidos.rows);
}

