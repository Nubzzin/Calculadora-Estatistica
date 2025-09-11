function media(valores) {
  if (componentId !== "classes") {
    return valores.reduce((soma, atual) => (soma += atual), 0) / valores.length;
  } else {
    let soma = 0;
    let fi = 0;
    for (let linha in valores) {
      let pontoMedio = (valores[linha].li + valores[linha].ls) / 2;
      soma += pontoMedio * valores[linha].fi;
      fi += valores[linha].fi;
    }
    let resultado = soma / fi;
    return resultado;
  }
}

function mediana(valores) {
  if (componentId !== "classes") {
    if (valores.length % 2 == 0) {
      return (
        (valores[valores.length / 2 - 1] + valores[valores.length / 2]) / 2
      );
    } else {
      return valores[(valores.length - 1) / 2];
    }
  } else {
    let n = valores.reduce((acc, curr) => acc + curr.fi, 0);
    let metade = n / 2;

    let acumulada = 0;
    let classeMediana = null;
    let Fa = 0;

    for (let i = 0; i < valores.length; i++) {
      acumulada += valores[i].fi;
      if (acumulada >= metade) {
        classeMediana = valores[i];
        Fa = acumulada - valores[i].fi;
        break;
      }
    }
    if (!classeMediana) return null;

    let Li = classeMediana.li;
    let fm = classeMediana.fi;
    let h = classeMediana.ls - classeMediana.li;

    let mediana = Li + ((metade - Fa) / fm) * h;
    return mediana;
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

function modaBruta(valores) {
  if (!Array.isArray(valores) || valores.length === 0) return [[], 0];

  let maxFi = Math.max(...valores.map((v) => v.fi));

  let modas = [];
  if (maxFi !== 1) {
    for (let i = 0; i < valores.length; i++) {
      if (valores[i].fi === maxFi) {
        modas.push([valores[i].li, valores[i].ls]);
      }
    }
  }

  return [modas, modas.length];
}

function modaCzuber(valores) {
  let maxFi = Math.max(...valores.map((v) => v.fi));

  let classesModais = valores.filter((v) => v.fi === maxFi);

  if (classesModais.length > 1) {
    return [[], 0];
  }

  let i = valores.findIndex((v) => v.fi === maxFi);
  let Li = valores[i].li;
  let fm = valores[i].fi;
  let h = valores[i].ls - valores[i].li;
  let fAnterior = i > 0 ? valores[i - 1].fi : 0;
  let fPosterior = i < valores.length - 1 ? valores[i + 1].fi : 0;

  let Mo = Li + ((fm - fAnterior) / (fm - fAnterior + (fm - fPosterior))) * h;

  return [[Mo], 1];
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
  if (componentId !== "classes") {
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
    return Number(resultado / (valores.length - 1));
  } else {
    let somaFi = 0;
    let somaXiFi = 0;

    for (let v of valores) {
      let xi = (v.li + v.ls) / 2;
      somaXiFi += xi * v.fi;
      somaFi += v.fi;
    }

    let media = somaXiFi / somaFi;

    let somaDesvios = 0;
    for (let v of valores) {
      let xi = (v.li + v.ls) / 2;
      somaDesvios += v.fi * Math.pow(xi - media, 2);
    }

    let variancia = somaDesvios / (somaFi - 1);

    return variancia;
  }
}

function desvioPadrao(variancia) {
  return Math.sqrt(variancia);
}

function coeficienteVariacao(desvioPadrao, agrupamentoDiscreto, valores) {
  if (componentId !== "classes") {
    return (100 * desvioPadrao) / agrupamentoDiscreto[1];
  } else {
    let somaFi = 0;
    let somaXiFi = 0;

    for (let v of valores) {
      let xi = (v.li + v.ls) / 2;
      somaXiFi += xi * v.fi;
      somaFi += v.fi;
    }

    let media = somaXiFi / somaFi;

    let somaDesvios = 0;
    for (let v of valores) {
      let xi = (v.li + v.ls) / 2;
      somaDesvios += v.fi * Math.pow(xi - media, 2);
    }

    let desvioPadrao = Math.sqrt(somaDesvios / (somaFi - 1));

    let CV = (desvioPadrao * 100) / media;

    return CV;
  }
}

function converterFiToTabelaValues(valores) {
  let resultado = [];
  let mapa = {};
  for (let i = 0; i < valores.length; i += 2) {
    if (valores[i] !== 0) mapa[valores[i]] = (mapa[valores[i]] || 0) + 1;
    for (let j = 0; j < valores[i + 1]; j++) {
      resultado.push(valores[i]);
    }
  }
  for (let key in mapa) {
    if (mapa[key] > 1) {
      repetida = true;
      return [];
    }
  }
  repetida = false;
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
// let valores = [1, 1, 3, 2, 4, 4];
// console.log("Valores:", valores);
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
