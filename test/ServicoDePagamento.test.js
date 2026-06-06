const assert = require('assert');
const ServicoDePagamento = require('../src/ServicoDePagamento');

describe('ServicoDePagamento', () => {
  let servicoDePagamento;

  beforeEach(() => {
    servicoDePagamento = new ServicoDePagamento();
  });

  describe('método pagar', () => {
    it('deve adicionar pagamento com categoria "cara" quando valor > 100', () => {
      servicoDePagamento.pagar('0987-7656-3475', 'Samar', 156.87);
      
      const ultimoPagamento = servicoDePagamento.consultarUltimoPagamento();
      
      assert.strictEqual(ultimoPagamento.codigoBarras, '0987-7656-3475');
      assert.strictEqual(ultimoPagamento.empresa, 'Samar');
      assert.strictEqual(ultimoPagamento.valor, 156.87);
      assert.strictEqual(ultimoPagamento.categoria, 'cara');
    });

    it('deve adicionar pagamento com categoria "padrão" quando valor <= 100', () => {
      servicoDePagamento.pagar('1234-5678-9012', 'Empresa X', 50.00);
      
      const ultimoPagamento = servicoDePagamento.consultarUltimoPagamento();
      
      assert.strictEqual(ultimoPagamento.codigoBarras, '1234-5678-9012');
      assert.strictEqual(ultimoPagamento.empresa, 'Empresa X');
      assert.strictEqual(ultimoPagamento.valor, 50.00);
      assert.strictEqual(ultimoPagamento.categoria, 'padrão');
    });

    it('deve adicionar pagamento com categoria "padrão" quando valor = 100', () => {
      servicoDePagamento.pagar('1111-2222-3333', 'Empresa Y', 100.00);
      
      const ultimoPagamento = servicoDePagamento.consultarUltimoPagamento();
      
      assert.strictEqual(ultimoPagamento.categoria, 'padrão');
    });

    it('deve armazenar múltiplos pagamentos na lista', () => {
      servicoDePagamento.pagar('1111-2222-3333', 'Empresa A', 50.00);
      servicoDePagamento.pagar('4444-5555-6666', 'Empresa B', 200.00);
      servicoDePagamento.pagar('7777-8888-9999', 'Empresa C', 75.00);
      
      assert.strictEqual(servicoDePagamento.pagamentos.length, 3);
    });
  });

  describe('método consultarUltimoPagamento', () => {
    it('deve retornar null quando não há pagamentos', () => {
      const resultado = servicoDePagamento.consultarUltimoPagamento();
      
      assert.strictEqual(resultado, null);
    });

    it('deve retornar o último pagamento adicionado', () => {
      servicoDePagamento.pagar('1111-2222-3333', 'Empresa A', 50.00);
      servicoDePagamento.pagar('4444-5555-6666', 'Empresa B', 200.00);
      
      const ultimoPagamento = servicoDePagamento.consultarUltimoPagamento();
      
      assert.strictEqual(ultimoPagamento.codigoBarras, '4444-5555-6666');
      assert.strictEqual(ultimoPagamento.empresa, 'Empresa B');
      assert.strictEqual(ultimoPagamento.valor, 200.00);
      assert.strictEqual(ultimoPagamento.categoria, 'cara');
    });

    it('deve retornar apenas o último pagamento, não a lista completa', () => {
      servicoDePagamento.pagar('1111-2222-3333', 'Empresa A', 50.00);
      servicoDePagamento.pagar('4444-5555-6666', 'Empresa B', 200.00);
      
      const ultimoPagamento = servicoDePagamento.consultarUltimoPagamento();
      
      // Verifica que o resultado é um objeto, não um array
      assert.strictEqual(typeof ultimoPagamento, 'object');
      assert.strictEqual(Array.isArray(ultimoPagamento), false);
      assert.strictEqual(Array.isArray(servicoDePagamento.pagamentos), true);
    });
  });
});
