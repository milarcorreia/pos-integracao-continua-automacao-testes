# Trabalho de Conclusão da Disciplina - Programação para Automação de Testes Parte 1

Este projeto consiste em uma implementação prática de JavaScript com testes automatizados usando Mocha e Node Assert.

## Descrição

O projeto implementa uma classe `ServicoDePagamento` que gerencia pagamentos com as seguintes funcionalidades:

- **Método `pagar(codigoBarras, empresa, valor)`**: Realiza um pagamento e o armazena em uma lista
- **Método `consultarUltimoPagamento()`**: Retorna o último pagamento realizado

## Regras de Negócio

Cada pagamento possui as seguintes propriedades:
- `codigoBarras`: Código de barras do pagamento
- `empresa`: Nome da empresa
- `valor`: Valor do pagamento
- `categoria`: Classificação automática baseada no valor:
  - `"cara"` quando valor > 100.00
  - `"padrão"` quando valor <= 100.00

## Estrutura do Projeto

```
trabalho-javascript/
├── src/
│   └── ServicoDePagamento.js    ← Classe principal
├── test/
│   └── ServicoDePagamento.test.js ← Testes automatizados
├── package.json                  ← Dependências do projeto
└── README.md                     ← Documentação
```

## Como Executar

### Instalar dependências
```bash
npm install
```

### Executar testes
```bash
npm test
```

## Exemplo de Uso

```javascript
const ServicoDePagamento = require('./src/ServicoDePagamento');

const servicoDePagamento = new ServicoDePagamento();

servicoDePagamento.pagar('0987-7656-3475', 'Samar', 156.87);

console.log(servicoDePagamento.consultarUltimoPagamento());
// Output:
// {
//   codigoBarras: '0987-7656-3475',
//   empresa: 'Samar',
//   valor: 156.87,
//   categoria: 'cara'
// }
```

## Tecnologias Utilizadas

- JavaScript (Node.js)
- Mocha (Framework de testes)
- Node Assert (Biblioteca de asserções)

## Testes

O projeto possui 7 testes automatizados cobrindo:
- Pagamentos com valor > 100 (categoria "cara")
- Pagamentos com valor <= 100 (categoria "padrão")
- Pagamentos com valor exato 100
- Armazenamento de múltiplos pagamentos
- Consulta quando não há pagamentos
- Retorno do último pagamento
- Verificação de que retorna apenas um pagamento, não a lista completa
