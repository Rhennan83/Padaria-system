# 📜 Changelog - Padaria System

Todas as mudanças relevantes neste projeto serão documentadas aqui.

---

## [2.0.0] - 2026-06-02
### Adicionado
- Módulo de **clientes** (cadastrar e listar).
- Módulo de **produtos** (cadastrar e listar).
- Módulo de **pedidos/vendas** (registrar venda, atualizar estoque, listar pedidos).
- Módulo de **relatórios do gerente**:
  - Faturamento total.
  - Produtos com estoque baixo.
  - Ranking de clientes mais ativos.
  - Ranking de produtos mais vendidos.
- Scripts SQL:
  - `init_padaria.sql` → criação das tabelas.
  - `seed_padaria.sql` → dados iniciais.
  - `relatorios_padaria.sql` → consultas prontas para relatórios.

### Alterado
- `main.ts` atualizado com menu completo e loop contínuo.
- Estrutura modularizada em arquivos separados (`clientes.ts`, `produtos.ts`, `pedidos.ts`, `relatorios.ts`, `db.ts`).

---

## [1.0.0] - 2026-05-30
### Adicionado
- Primeira versão do sistema.
- Cadastro e listagem de clientes.
- Integração inicial com PostgreSQL.

