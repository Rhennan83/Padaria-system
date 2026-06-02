import fs from 'fs';
import { Produto } from '../domain/Produto';

export interface IProdutoRepository {
  buscarPorId(id: string): Produto | undefined;
  salvar(produto: Produto): void;
}

export class FileRepository implements IProdutoRepository {
  private filePath = './produtos.json';

  constructor() {
    try {
      if (!fs.existsSync(this.filePath)) {
        fs.writeFileSync(this.filePath, JSON.stringify([]));
      }
    } catch (error) {
      throw new Error(`Erro ao inicializar FileRepository`);
    }
  }

  private lerArquivo(): Produto[] {
    try {
      const data = fs.readFileSync(this.filePath, 'utf-8');
      if (!data || data.trim().length === 0) return [];
      const plainObjects = JSON.parse(data);
      if (!Array.isArray(plainObjects)) return [];
      return plainObjects.map((p: any) => {
        try {
          return new Produto(p.id, p.nome, p.estoque, p.preco);
        } catch (e) {
          return null;
        }
      }).filter((p): p is Produto => p !== null);
    } catch (error) {
      return [];
    }
  }

  public buscarPorId(id: string): Produto | undefined {
    if (!id || id.trim().length === 0) return undefined;
    const produtos = this.lerArquivo();
    return produtos.find(p => p.id === id.trim());
  }

  public salvar(produto: Produto): void {
    if (!produto || !(produto instanceof Produto)) throw new Error("Produto inválido.");
    try {
      const produtos = this.lerArquivo();
      const index = produtos.findIndex(p => p.id === produto.id);
      if (index !== -1) produtos[index] = produto;
      else produtos.push(produto);
      fs.writeFileSync(this.filePath, JSON.stringify(produtos, null, 2));
    } catch (error) {
      throw new Error(`Erro ao salvar produto`);
    }
  }
}

export class ProdutoRepository implements IProdutoRepository {
  private produtos: Produto[] = [];

  public buscarPorId(id: string): Produto | undefined {
    if (!id || id.trim().length === 0) return undefined;
    return this.produtos.find(p => p.id === id.trim());
  }

  public salvar(produto: Produto): void {
    if (!produto || !(produto instanceof Produto)) throw new Error("Produto inválido.");
    const index = this.produtos.findIndex(p => p.id === produto.id);
    if (index !== -1) this.produtos[index] = produto;
    else this.produtos.push(produto);
  }
}
