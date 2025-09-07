function media(valores) {
  return (
    Math.round(
      (valores.reduce((soma, atual) => (soma += atual), 0) / valores.length) *
        100,
    ) / 100
  );
}

function mediana(valores) {
  if (valores.length % 2 == 0) {
    return (valores[valores.length / 2 - 1] + valores[valores.length / 2]) / 2;
  } else {
    return valores[(valores.length - 1) / 2];
  }
}

function moda(valores) {
  let mapa = {};
  let modas = [[], 0];

  valores.forEach((x) => {
    mapa[x] = (mapa[x] || 0) + 1;
  });
  for (let key in mapa) {
    if (mapa[key] > modas[1]) {
      modas[1] = mapa[key];
    }
  }
  for (let key in mapa) {
    if (mapa[key] === modas[1] && modas[1] > 1) {
      modas[0].push(key);
    }
  }
  return modas;
}

function agrupamentoDiscreto(valores) {
  let mapa = {};
  let fi = 0;
  valores.forEach((x) => {
    mapa[x] = (mapa[x] || 0) + 1;
  });
  let soma = [[], 0];
  for (let key in mapa) {
    soma[0].push(key * mapa[key]);
    fi += mapa[key];
  }
  soma[0].forEach((x) => {
    soma[1] += x;
  });
  return [soma, Math.round((soma[1] / fi) * 100) / 100];
}

function variancia(valores) {
  let mapa = {};
  let ad = media(valores);
  valores.forEach((x) => {
    mapa[x] = (mapa[x] || 0) + 1;
  });
  let soma = [];
  for (let key in mapa) {
    soma.push((key - ad) ** 2 * mapa[key]);
  }
  let resultado = 0;
  soma.forEach((x) => {
    resultado += x;
  });
  return Math.round(Number(resultado / (valores.length - 1)) * 100) / 100;
}

function desvioPadrao(variancia) {
  return Math.round(Math.sqrt(variancia) * 100) / 100;
}

function coeficienteVariacao(desvioPadrao, agrupamentoDiscreto) {
  return (
    Math.round(((100 * desvioPadrao) / agrupamentoDiscreto[1]) * 100) / 100
  );
}

function converterFiToTabelaValues(valores) {
  let resultado = [];
  for (let i = 0; i < valores.length; i += 2) {
    for (let j = 0; j < valores[i + 1]; j++) {
      resultado.push(valores[i]);
    }
    if (valores[i + 1] === 0) {
      resultado.push(valores[i]);
    }
  }
  return resultado;
}

function converterTabelaToFiValues(valores) {
  let mapa = {};
  let resultado = [];

  valores.forEach((x) => {
    mapa[x] = (mapa[x] || 0) + 1;
  });

  for (let key in mapa) {
    resultado.push(Number(key), mapa[key]);
  }

  return resultado;
}

// Testes
let valores = [1, 1, 3, 2, 4, 4];
console.log("Valores:", valores);
// console.log("Média:", media(valores));
// console.log("Mediana:", mediana(valores));
// console.log("Moda:", moda(valores));
// console.log("Agrupamento Discreto:", agrupamentoDiscreto(valores));
// console.log("Variancia:", variancia(valores));
// console.log("Desvio Padrao:", desvioPadrao(variancia(valores)));
// console.log(
//   "Coeficiente de Variacao:",
//   coeficienteVariacao(
//     desvioPadrao(variancia(valores)),
//     agrupamentoDiscreto(valores),
//   ),
// );
// console.log(converterFiToTabelaValues(valores));
// console.log(converterTabelaToFiValues(valores));
