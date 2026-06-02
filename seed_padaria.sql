-- Inserir clientes
INSERT INTO clientes (nome, telefone, endereco) VALUES
('Maria Silva', '11999999999', 'Rua das Flores, 123'),
('João Souza', '11888888888', 'Av. Central, 456'),
('Fabio Rhennan', '(86) 99931-3228', 'Rua Jose de Abreu');

-- Inserir produtos
INSERT INTO produtos (nome, preco, estoque) VALUES
('Pão Francês', 0.50, 200),
('Bolo de Chocolate', 25.00, 15),
('Café 500g', 15.00, 30),
('Suco Natural 1L', 8.00, 20),
('Croissant', 4.50, 50);

-- Criar um pedido de exemplo
INSERT INTO pedidos (cliente_id, total) VALUES (1, 50.00);

-- Inserir itens do pedido
INSERT INTO itens_pedido (pedido_id, produto_id, quantidade, preco_unitario) VALUES
(1, 1, 20, 0.50),   -- 20 pães
(1, 3, 2, 15.00);   -- 2 cafés

