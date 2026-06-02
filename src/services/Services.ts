import fs from 'fs';
import { Produto } from '../domain/Produto';
import { IProdutoRepository } from '../infrastructure/Repositories';

export class VendaService {
  constructor(private repo: IProdutoRepository) {}

  public realizarVenda(id: string, quantidade: number): void {
    if (!id || id.trim().length === 0) throw new Error("ID não pode ser vazio.");
    if (!Number.isFinite(quantidade)) throw new Error("Quantidade inválida.");
    if (!Number.isInteger(quantidade) || quantidade <= 0) throw new Error("Quantidade deve ser inteiro positivo.");

    const produto = this.repo.buscarPorId(id.trim());
    if (!produto) throw new Error(`Produto não encontrado`);

    try {
      produto.vender(quantidade);
      this.repo.salvar(produto);
      console.log(`✓ Sucesso: Vendido ${quantidade} unidade(s) de ${produto.nome}.`);
    } catch (error) {
      throw error;
    }
  }
}

export class EstoqueService {
  constructor(private repo: IProdutoRepository) {}

  public cadastrarProduto(id: string, nome: string, preco: number, estoque: number): void {
    if (!id || id.trim().length === 0) throw new Error("ID não pode ser vazio.");
    if (!nome || nome.trim().length === 0) throw new Error("Nome não pode ser vazio.");
    if (!Number.isFinite(preco) || preco < 0) throw new Error("Preço deve ser >= 0.");
    if (!Number.isFinite(estoque) || estoque < 0) throw new Error("Estoque deve ser >= 0.");
    if (this.repo.buscarPorId(id.trim())) throw new Error(`ID ${id.trim()} já existe.`);

    try {
      const novoProduto = new Produto(id, nome, estoque, preco);
      this.repo.salvar(novoProduto);
      console.log(`✓ Produto cadastrado: ${nome}`);
    } catch (error) {
      throw error;
    }
  }
}

export class BalanceteService {
  private logPath = './balancete.txt';

  constructor() {
    try {
      fs.appendFileSync(this.logPath, '');
    } catch (error) {
      throw new Error(`Erro ao inicializar BalanceteService`);
    }
  }

  public registrarVenda(nome: string, qtd: number, total: number): void {
    if (!nome || nome.trim().length === 0) throw new Error("Nome não pode ser vazio.");
    if (!Number.isInteger(qtd) || qtd <= 0) throw new Error("Quantidade deve ser inteiro positivo.");
    if (!Number.isFinite(total) || total < 0) throw new Error("Total deve ser >= 0.");

    try {
      const timestamp = new Date().toLocaleString('pt-BR');
      const linha = `[${timestamp}] Venda: ${nome.trim()} | Qtd: ${qtd} | Total: R$ ${total.toFixed(2)}\n`;
      fs.appendFileSync(this.logPath, linha);
    } catch (error) {
      console.error(`⚠️ Erro ao registrar venda`);
    }
  }

  public lerBalancete(): string {
    try {
      if (fs.existsSync(this.logPath)) {
        return fs.readFileSync(this.logPath, 'utf-8');
      }
      return '';
    } catch (error) {
      return '';
    }
  }
}
