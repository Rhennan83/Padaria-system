export class Produto {
  public readonly id: string;
  public readonly nome: string;
  private _estoque: number;
  public preco: number;

  constructor(id: string, nome: string, estoque: number, preco: number) {
    if (!id || id.trim().length === 0) throw new Error("ID não pode ser vazio.");
    if (!nome || nome.trim().length === 0) throw new Error("Nome não pode ser vazio.");
    if (!Number.isFinite(estoque) || estoque < 0) throw new Error("Estoque deve ser >= 0.");
    if (!Number.isFinite(preco) || preco < 0) throw new Error("Preço deve ser >= 0.");

    this.id = id.trim();
    this.nome = nome.trim();
    this._estoque = estoque;
    this.preco = preco;
  }

  get estoque(): number {
    return this._estoque;
  }

  public vender(quantidade: number): void {
    if (!Number.isFinite(quantidade)) throw new Error("Quantidade inválida.");
    if (!Number.isInteger(quantidade) || quantidade <= 0) throw new Error("Quantidade deve ser inteiro positivo.");
    if (this._estoque < quantidade) throw new Error(`Insuficiente. Disponível: ${this._estoque}`);
    this._estoque -= quantidade;
  }
}
