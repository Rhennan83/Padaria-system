-- Faturamento total da padaria
SELECT SUM(total) AS faturamento_total FROM pedidos;

-- Produtos com estoque baixo (menos de 5 unidades)
SELECT * FROM produtos WHERE estoque < 5;

-- Clientes mais ativos (quantidade de pedidos)
SELECT c.nome, COUNT(p.id) AS total_pedidos
FROM clientes c
JOIN pedidos p ON c.id = p.cliente_id
GROUP BY c.nome
ORDER BY total_pedidos DESC;

-- Produtos mais vendidos
SELECT pr.nome, SUM(i.quantidade) AS total_vendido
FROM itens_pedido i
JOIN produtos pr ON i.produto_id = pr.id
GROUP BY pr.nome
ORDER BY total_vendido DESC;

