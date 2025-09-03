export function media(valores) {
  return valores.reduce((soma, atual) => (soma += atual), 0) / valores.length;
}

export function mediana(valores) {
  valores.sort((a, b) => a - b);
  if (valores.length % 2 == 0) {
    return (valores[valores.length / 2 - 1] + valores[valores.length / 2]) / 2;
  } else {
    return valores[(valores.length - 1) / 2];
  }
}

export function moda(valores) {
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
    if (mapa[key] === modas[1]) {
      modas[0].push(key);
    }
  }
  return modas;
}

// Testes
let valores = [1, 1, 2, 3, 4, 4, 4];
console.log("Média:", media(valores));
console.log("Mediana:", mediana(valores));
console.log("Moda:", moda(valores));
