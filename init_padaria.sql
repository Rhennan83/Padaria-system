CREATE DATABASE padaria_system;

\c padaria_system

CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    telefone VARCHAR(20),
    endereco TEXT
);

CREATE TABLE produtos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    estoque INT DEFAULT 0
);

CREATE TABLE pedidos (
    id SERIAL PRIMARY KEY,
    cliente_id INT REFERENCES clientes(id),
    data TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total DECIMAL(10,2) NOT NULL
);

CREATE TABLE itens_pedido (
    id SERIAL PRIMARY KEY,
    pedido_id INT REFERENCES pedidos(id),
    produto_id INT REFERENCES produtos(id),
    quantidade INT NOT NULL,
    preco_unitario DECIMAL(10,2) NOT NULL
);

