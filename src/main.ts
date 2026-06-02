import * as readline from 'readline-sync';
import { Produto } from './domain/Produto';
import { FileRepository, IProdutoRepository, ProdutoRepository } from './infrastructure/Repositories';
import { VendaService, EstoqueService, BalanceteService } from './services/Services';

const repo: IProdutoRepository = new FileRepository();
const estoqueService = new EstoqueService(repo);
const vendaService = new VendaService(repo);
const balancete = new BalanceteService();

function main() {
  console.log('\n╔════════════════════════════════════════╗');
  console.log('║   SISTEMA PADARIA v1.1 — REFUNDIDO   ║');
  console.log('║            Blindado & Robusto        ║');
  console.log('╚════════════════════════════════════════╝\n');

  let rodando = true;
  while (rodando) {
    console.log('\n--- MENU PRINCIPAL ---');
    const acao = readline.keyInSelect(
      ['Cadastrar Produto', 'Realizar Venda', 'Ver Balancete', 'Testes Automatizados', 'Sair'],
      'Escolha uma ação: '
    );

    try {
      switch (acao) {
        case 0:
          const id = readline.question('ID do produto: ').trim();
          const nome = readline.question('Nome do produto: ').trim();
          const preco = readline.questionFloat('Preço (R$): ');
          const estoque = readline.questionInt('Estoque inicial: ');
          estoqueService.cadastrarProduto(id, nome, preco, estoque);
          break;
        case 1:
          const vid = readline.question('ID do produto: ').trim();
          const vqtd = readline.questionInt('Quantidade: ');
          vendaService.realizarVenda(vid, vqtd);
          const prod = repo.buscarPorId(vid);
          if (prod) balancete.registrarVenda(prod.nome, vqtd, prod.preco * vqtd);
          break;
        case 2:
          const conteudo = balancete.lerBalancete();
          if (conteudo) console.log('\n--- BALANCETE ---\n' + conteudo);
          else console.log('(Nenhuma venda registrada)');
          break;
        case 3:
          executarTestes();
          break;
        case 4:
          rodando = false;
          console.log('\n✓ Sistema encerrado.\n');
          break;
        default:
          break;
      }
    } catch (error) {
      console.error(`\n✗ Erro: ${error instanceof Error ? error.message : 'Desconhecido'}\n`);
    }
  }
}

function executarTestes() {
  const testRepo: IProdutoRepository = new ProdutoRepository();
  const testEstoque = new EstoqueService(testRepo);
  const testVenda = new VendaService(testRepo);

  console.log('\n╔════════════════════════════════════════╗');
  console.log('║        TESTES AUTOMATIZADOS           ║');
  console.log('╚════════════════════════════════════════╝\n');

  let passar = 0, falhar = 0;

  console.log('TESTE 1 — Validação de Produto');
  try { new Produto('', 'Item', 10, 5); falhar++; console.log('  ✗ id vazio'); }
  catch { passar++; console.log('  ✓ id vazio'); }

  try { new Produto('id', '', 10, 5); falhar++; console.log('  ✗ nome vazio'); }
  catch { passar++; console.log('  ✓ nome vazio'); }

  try { new Produto('id', 'Item', -5, 5); falhar++; console.log('  ✗ estoque negativo'); }
  catch { passar++; console.log('  ✓ estoque negativo'); }

  try { new Produto('id', 'Item', 10, -5); falhar++; console.log('  ✗ preco negativo'); }
  catch { passar++; console.log('  ✓ preco negativo'); }

  console.log('\nTESTE 2 — Método vender()');
  const p = new Produto('id', 'Item', 10, 5);

  try { p.vender(0); falhar++; console.log('  ✗ quantidade 0'); }
  catch { passar++; console.log('  ✓ quantidade 0'); }

  try { p.vender(-5); falhar++; console.log('  ✗ quantidade negativa'); }
  catch { passar++; console.log('  ✓ quantidade negativa'); }

  try { p.vender(NaN); falhar++; console.log('  ✗ NaN'); }
  catch { passar++; console.log('  ✓ NaN'); }

  try { p.vender(3.5); falhar++; console.log('  ✗ decimal'); }
  catch { passar++; console.log('  ✓ decimal'); }

  try { p.vender(20); falhar++; console.log('  ✗ venda > estoque'); }
  catch { passar++; console.log('  ✓ venda > estoque'); }

  try { p.vender(5); if (p.estoque === 5) { passar++; console.log('  ✓ venda válida'); } else { falhar++; } }
  catch { falhar++; }

  console.log('\nTESTE 3 — Repository');
  try { testRepo.buscarPorId(''); passar++; console.log('  ✓ id vazio'); }
  catch { falhar++; }

  console.log('\nTESTE 4 — EstoqueService');
  try { testEstoque.cadastrarProduto('', 'Item', 5, 10); falhar++; console.log('  ✗ id vazio'); }
  catch { passar++; console.log('  ✓ id vazio'); }

  try { testEstoque.cadastrarProduto('id1', 'Item1', 10, 20); passar++; console.log('  ✓ cadastro válido'); }
  catch { falhar++; }

  try { testEstoque.cadastrarProduto('id1', 'Item2', 15, 20); falhar++; console.log('  ✗ duplicate'); }
  catch { passar++; console.log('  ✓ duplicate'); }

  console.log('\nTESTE 5 — VendaService');
  try { testVenda.realizarVenda('', 5); falhar++; console.log('  ✗ id vazio'); }
  catch { passar++; console.log('  ✓ id vazio'); }

  try { testVenda.realizarVenda('notfound', 5); falhar++; console.log('  ✗ produto não existe'); }
  catch { passar++; console.log('  ✓ produto não existe'); }

  try { testVenda.realizarVenda('id1', 5); passar++; console.log('  ✓ venda válida'); }
  catch { falhar++; }

  console.log('\n╔════════════════════════════════════════╗');
  console.log(`║ ✓ PASSOU:  ${passar}                          ║`);
  console.log(`║ ✗ FALHOU:  ${falhar}                          ║`);
  console.log('╚════════════════════════════════════════╝\n');
}

main();
