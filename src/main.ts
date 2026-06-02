import readlineSync from "readline-sync";
import { cadastrarCliente, listarClientes } from "./clientes";
import { cadastrarProduto, listarProdutos } from "./produtos";
import { registrarVenda, listarPedidos } from "./pedidos";
import { relatorioGerente } from "./relatorios";

async function main() {
  while (true) {
    console.log("\n=== Sistema Padaria ===");
    console.log("1 - Cadastrar Cliente");
    console.log("2 - Listar Clientes");
    console.log("3 - Cadastrar Produto");
    console.log("4 - Listar Produtos");
    console.log("5 - Registrar Venda");
    console.log("6 - Listar Pedidos");
    console.log("7 - Relatório (Gerente)");
    console.log("0 - Sair");

    const opcao = readlineSync.question("Escolha uma opção: ");

    switch(opcao) {
      case "1": await cadastrarCliente(); break;
      case "2": await listarClientes(); break;
      case "3": await cadastrarProduto(); break;
      case "4": await listarProdutos(); break;
      case "5": await registrarVenda(); break;
      case "6": await listarPedidos(); break;
      case "7": await relatorioGerente(); break;
      case "0":
        console.log("Saindo...");
        process.exit(0);
      default:
        console.log("Opção inválida. Digite um número do menu.");
    }
  }
}

main();

