(function (globalScope) {
  function limparTexto(valor) {
    return typeof valor === 'string' ? valor.trim() : '';
  }

  function validarCPF(cpf) {
    const cpfLimpo = limparTexto(cpf).replace(/\D/g, '');

    if (!cpfLimpo || cpfLimpo.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(cpfLimpo)) return false;

    let soma = 0;
    for (let i = 0; i < 9; i += 1) {
      soma += Number(cpfLimpo.charAt(i)) * (10 - i);
    }

    let digito1 = 11 - (soma % 11);
    if (digito1 >= 10) digito1 = 0;

    soma = 0;
    for (let i = 0; i < 10; i += 1) {
      soma += Number(cpfLimpo.charAt(i)) * (11 - i);
    }

    let digito2 = 11 - (soma % 11);
    if (digito2 >= 10) digito2 = 0;

    return Number(cpfLimpo.charAt(9)) === digito1 && Number(cpfLimpo.charAt(10)) === digito2;
  }

  function calcularIdade(dataNascimento) {
    const data = new Date(dataNascimento + 'T00:00:00');
    const hoje = new Date();

    if (Number.isNaN(data.getTime())) {
      return NaN;
    }

    let idade = hoje.getFullYear() - data.getFullYear();
    const mesAtual = hoje.getMonth();
    const mesNascimento = data.getMonth();

    if (mesAtual < mesNascimento || (mesAtual === mesNascimento && hoje.getDate() < data.getDate())) {
      idade -= 1;
    }

    return idade;
  }

  function validar(pessoa) {
    const dados = pessoa || {};
    const erros = [];

    const nome = limparTexto(dados.nome);
    if (!nome) {
      erros.push('nome: obrigatorio');
    }

    if (!validarCPF(dados.cpf)) {
      erros.push('cpf: invalido');
    }

    const email = limparTexto(dados.email);
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      erros.push('email: invalido');
    }

    const dataNascimento = limparTexto(dados.data_nascimento);
    if (!dataNascimento) {
      erros.push('data_nascimento: obrigatoria');
    } else {
      const data = new Date(dataNascimento + 'T00:00:00');
      if (Number.isNaN(data.getTime())) {
        erros.push('data_nascimento: invalida');
      } else if (data > new Date()) {
        erros.push('data_nascimento: nao pode estar no futuro');
      }
    }

    if (dados.possui_cnh === true) {
      const idade = calcularIdade(dataNascimento);
      if (!Number.isNaN(idade) && idade < 18) {
        erros.push('possui_cnh: so a partir de 18 anos');
      }
    }

    return erros;
  }

  const api = {
    validar,
    validarCPF,
    calcularIdade,
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }

  globalScope.pessoaFisica = api;
  globalScope.validar = validar;
})(typeof window !== 'undefined' ? window : globalThis);
