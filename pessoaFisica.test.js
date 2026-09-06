const test = require('node:test');
const assert = require('node:assert/strict');
const { validar } = require('./pessoaFisica.js');

test('deve retornar todos os erros do formulário vazio', () => {
  const pessoa = {};
  const erros = validar(pessoa);

  assert.deepStrictEqual(erros, [
    'nome: obrigatorio',
    'cpf: invalido',
    'email: invalido',
    'data_nascimento: obrigatoria',
  ]);
});

test('deve rejeitar CPF inválido', () => {
  const erros = validar({
    nome: 'Ana Souza',
    cpf: '111.111.111-11',
    email: 'ana@email.com',
    data_nascimento: '1998-03-14',
  });

  assert.ok(erros.includes('cpf: invalido'));
});

test('deve rejeitar data no futuro', () => {
  const erros = validar({
    nome: 'Ana Souza',
    cpf: '529.982.247-25',
    email: 'ana@email.com',
    data_nascimento: '2030-01-01',
  });

  assert.ok(erros.includes('data_nascimento: nao pode estar no futuro'));
});

test('deve impedir CNH para menor de 18 anos', () => {
  const erros = validar({
    nome: 'Ana Souza',
    cpf: '529.982.247-25',
    email: 'ana@email.com',
    data_nascimento: '2010-03-14',
    possui_cnh: true,
  });

  assert.ok(erros.includes('possui_cnh: so a partir de 18 anos'));
});

test('deve aceitar um cadastro válido', () => {
  const pessoa = {
    nome: 'Ana Maria Souza',
    cpf: '529.982.247-25',
    email: 'ana.maria@email.com',
    data_nascimento: '1998-03-14',
  };

  assert.deepStrictEqual(validar(pessoa), []);
});
