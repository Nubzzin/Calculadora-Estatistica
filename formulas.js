function media(valores) {
  return valores.reduce((soma, atual) => (soma += atual), 0) / valores.length;
}

function mediana(valores) {
  valores.sort((a, b) => a - b);
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
  if (moda[1] > 1) {
    for (let key in mapa) {
      if (mapa[key] > modas[1]) {
        modas[1] = mapa[key];
      }
    }
  }
  for (let key in mapa) {
    if (mapa[key] === modas[1]) {
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
  return [soma, soma[1] / fi];
}

function variancia(valores) {
  let mapa = {};
  let fi = 0;
  let ad = agrupamentoDiscreto(valores)[1];
  valores.forEach((x) => {
    mapa[x] = (mapa[x] || 0) + 1;
  });
  let soma = [];
  for (let key in mapa) {
    soma.push((key - ad) ** 2 * mapa[key]);
    fi += mapa[key];
  }
  let resultado = 0;
  soma.forEach((x) => {
    resultado += x;
  });
  return Number((resultado / fi).toFixed(2));
}

function desvioPadrao(variancia) {
  return Math.sqrt(variancia);
}

function coeficienteVariacao(desvioPadrao, agrupamentoDiscreto) {
  return (100 * desvioPadrao) / agrupamentoDiscreto[1];
}

// Testes
// let valores = [1, 1, 2, 3, 4, 4];
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
