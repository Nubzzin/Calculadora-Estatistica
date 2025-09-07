let values = [];
let informacoes = [];
let placeholderSize = 3;
let t = 0;
let pageId = "dados";
let componentId = "tabela";
let tipoUnidade = "Unidade";
let tablePosition = 1;
let repetida = false;

function lerTabela() {
  values = [];
  if (componentId === "fi") {
    let table = document.querySelector("#dataEntriesFi");
    let rows = table.querySelectorAll("tr");
    rows.forEach((row) => {
      let inputs = row.querySelectorAll("input");
      let rowData = [];
      inputs.forEach((input) => {
        values.push(Number(input.value));
      });
    });
    values = converterFiToTabelaValues(values);
    console.log("Lendo Fi:", values);
  } else if (componentId === "tabela" && placeholderSize < 3) {
    let table = document.querySelector("#dataEntries");
    let rows = table.querySelectorAll("tr");
    for (let row of rows) {
      for (let cell of row.cells) {
        values.push(Number(cell.textContent));
      }
    }
    for (let i = placeholderSize; i > 0; i--) {
      values.pop();
    }
    values.shift();
    console.log("Lendo Tabela:", values);
  }
}

function lerTasks() {
  informacoes = [];
  document.querySelectorAll(".task").forEach((task) => {
    if (
      task.classList.contains("done") &&
      !task.classList.contains("naopode")
    ) {
      informacoes.push(task.getAttribute("data"));
    }
  });
  console.log("Lendo Tasks:", informacoes);
}

function novaLinha() {
  let table = document.querySelector("#dataEntriesFi");
  let row = table.insertRow(-1);
  let cell = row.insertCell();
  tablePosition++;
  cell.innerHTML = `<input type="number" class="centered-input fi-input" id="cell-${tablePosition}" placeholder="...">`;
  cell = row.insertCell();
  tablePosition++;
  cell.innerHTML = `<input type="number" class="centered-input fi-input fi-min" id="cell-${tablePosition}" placeholder="..." min="1">`;
  formatarInput();
}

function removerLinha() {
  let table = document.querySelector("#dataEntriesFi");
  if (table.rows.length > 3) {
    table.deleteRow(-1);
    tablePosition -= 2;
  } else {
    table.rows[2].cells[0].querySelector("input").value = "";
    table.rows[2].cells[1].querySelector("input").value = "";
  }
}

// function reiniciarTasks() {
//   document.querySelectorAll(".task").forEach((task) => {
//     task.classList.remove("done");
//   });
//   informacoes = [];
// }

// function reiniciar() {
//   // reiniciarTasks();
//   if (document.querySelector("#unidadeInput").value === "") {
//     tipoUnidade = "Unidade";
//   }
//   document.querySelector(
//     "#dataEntries",
//   ).innerHTML = `<tr> <th colspan="3" class="unidade-texto">${tipoUnidade}</th> </tr><tr id="row-placeholder"><td></td><td></td><td></td></tr>`;
//   document.querySelector(
//     "#dataEntriesFi",
//   ).innerHTML = `<tr> <th class="unidade-texto">${tipoUnidade}</th> <th>Fi</th> </tr> <tr> <td> <input type="number" class="centered-input fi-input" id="cell-0" placeholder="0" /> </td> <td> <input type="number" class="centered-input fi-input fi-min" id="cell-1" placeholder="..." min="1" /> </td> </tr>`;
//   document.querySelectorAll(".fi-input.fi-min").forEach((inputField) => {
//     inputField.addEventListener("input", (e) => {
//       if (Number(inputField.value) < 1 && inputField.value !== "") {
//         inputField.value = 1;
//       }
//     });
//   });
//   values = [];
//   placeholderSize = 3;
//   t = 0;
//   console.log(values);
//   console.log(informacoes);
//   formatarInput();
//   changePage("dados");
// }

function mudarComponente(componenteId) {
  document.querySelectorAll(".component").forEach((component) => {
    component.classList.remove("active");
  });
  document
    .querySelectorAll(`.component.${componenteId}`)
    .forEach((component) => component.classList.add("active"));
  document
    .querySelectorAll("button[data-component]")
    .forEach((button) => button.classList.remove("mini-button"));
  document
    .querySelector(`button[data-component="${componenteId}"]`)
    .classList.add("mini-button");
  habilitarCzuberSeClasse();
}

// Função para mudar páginas
function changePage(pageId) {
  if (tipoUnidade === "Unidade") {
    tipoUnidade = "u";
  }
  // Esconder todas as páginas
  document.querySelectorAll(".page").forEach((page) => {
    page.classList.remove("active");
  });

  // Mostrar a página selecionada
  document.getElementById(pageId).classList.add("active");

  document.querySelectorAll(".result-item").forEach((item) => {
    item.classList.remove("active");
  });

  let result;
  if (informacoes.find((x) => x === "media")) {
    result = document.querySelector("#resultado-media");
    result.innerText = media(values);
    result.innerText += " " + tipoUnidade;
    result.parentElement.classList.add("active");
  }
  if (informacoes.find((x) => x === "moda")) {
    let modaV = moda(values);
    result = document.querySelector("#resultado-moda");
    switch (modaV[0].length) {
      case 0:
        result.innerText = "Amodal";
        break;
      case 1:
        result.innerText = "Unimodal: ";
        break;
      case 2:
        result.innerText = "Bimodal: ";
        break;
      case 3:
        result.innerText = "Trimodal: ";
        break;
      default:
        result.innerText = "Multimodal: ";
    }
    result.innerText += " " + modaV[0];
    result.parentElement.classList.add("active");
  }
  if (informacoes.find((x) => x === "moda-czuber")) {
    result = document.querySelector("#resultado-moda-czuber");
    if (componentId === "classes") {
      // result.innerText = modaCzuber(values);
      // result.innerText += " " + tipoUnidade;
      result.innerText = "A fazer";
    } else {
      result.innerText = "Apenas para classes";
    }
    result.parentElement.classList.add("active");
  }
  if (informacoes.find((x) => x === "mediana")) {
    result = document.querySelector("#resultado-mediana");
    result.innerText = mediana(values);
    result.innerText += " " + tipoUnidade;
    result.parentElement.classList.add("active");
  }
  if (informacoes.find((x) => x === "variancia")) {
    result = document.querySelector("#resultado-variancia");
    let v = variancia(values);
    if (v) {
      result.innerText = v;
      result.innerText += " " + tipoUnidade + "²";
    } else {
      result.innerText = "Não Possui";
    }
    result.parentElement.classList.add("active");
  }
  if (informacoes.find((x) => x === "coeficiente")) {
    result = document.querySelector("#resultado-coeficiente");
    let cv = coeficienteVariacao(
      desvioPadrao(variancia(values)),
      agrupamentoDiscreto(values),
    );
    if (cv) {
      result.innerText = cv;
      result.innerText += "%";
    } else {
      result.innerText = "Não Possui";
    }
    result.parentElement.classList.add("active");
  }
  if (informacoes.find((x) => x === "agrupamento")) {
    result = document.querySelector("#resultado-agrupamento");
    result.innerText = agrupamentoDiscreto(values)[1];
    result.parentElement.classList.add("active");
  }
  if (informacoes.find((x) => x === "desvio")) {
    result = document.querySelector("#resultado-desvio");
    let dp = desvioPadrao(variancia(values));
    if (dp) {
      result.innerText = dp;
      result.innerText += " " + tipoUnidade;
    } else {
      result.innerText = "Não Possui";
    }
    result.parentElement.classList.add("active");
  }
}

// Configurar event listeners quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", () => {
  // Adicionar eventos de clique aos itens de navegação
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.addEventListener("click", function () {
      pageId = this.getAttribute("data-page");
      changePage(pageId);
    });
  });

  // Adicionar eventos de clique aos botões com atributo data-page
  document.querySelectorAll("button[data-page]").forEach((button) => {
    button.addEventListener("click", () => {
      pageId = button.getAttribute("data-page");
      if (pageId === "resultados") {
        lerTabela();
        lerTasks();
        desenharGrafico(values);
        todosFeitos = true;
        document.querySelectorAll(".fi-input").forEach((input) => {
          if (!input.value) {
            todosFeitos = false;
          }
        });
        if (informacoes.length > 0 && values.length > 0) {
          values.sort((a, b) => a - b);
          changePage(pageId);
        } else if (values.length === 0) {
          if (componentId === "fi" && !todosFeitos) {
            if (repetida) {
              showNotification(
                "Valores repetidos encontrados na coluna esquerda.",
              );
            } else {
              showNotification("Complete pelo menos uma linha.");
            }
          } else {
            showNotification("Você não digitou nenhum dado.");
          }
        } else if (informacoes.length === 0) {
          showNotification(
            "Você não selecionou pelo menos uma opção de cálculo.",
          );
        }
      } else {
        // reiniciar();
        changePage(pageId);
      }
    });
  });

  document.querySelectorAll("button[data-component]").forEach((button) => {
    button.addEventListener("click", () => {
      button.classList.add("mini-button");
      // lerTabela();
      componentId = button.getAttribute("data-component");
      mudarComponente(componentId);
    });
  });

  // Função de exemplo para mostrar como adicionar interatividade
  function showNotification(message) {
    // Criar elemento de notificação
    const notification = document.createElement("div");
    notification.className = "notification";
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      bottom: 50%; /* raised a little higher than 20px */
      left: 61.1%;
      transform: translateX(-50%);
      background-color: #e74c3c;
      color: white;
      padding: 1rem;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.2);
      z-index: 1000;
      font-weight: 800;
    `;

    // Adicionar à página
    document.body.appendChild(notification);

    // Remover após 3 segundos
    setTimeout(() => {
      notification.remove();
    }, 3000);
  }

  let inputTabela = document.querySelector("#dataInput");
  inputTabela.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      let currentValue;
      try {
        currentValue = Number(inputTabela.value);
        inputTabela.value = "";
      } catch (err) {
        showNotification("Entrada inválida. Insira um número.");
      }
      let rowPlaceholder = document.querySelector("#row-placeholder");
      let table = document.querySelector("#dataEntries");
      let row = table.rows[1];

      if (placeholderSize > 0) {
        rowPlaceholder.deleteCell(t);
        placeholderSize--;
      }
      let cell = row.insertCell(t);
      t++;
      if ((row.cells.length - placeholderSize) % 3 == 0) {
        row = table.insertRow(1);
        t = 0;
      }
      cell.textContent = currentValue;
    }
  });
});

function formatarInput() {
  document.querySelectorAll(".fi-input").forEach((inputField) => {
    inputField.addEventListener("keypress", (e) => {
      if (
        (inputField.id === `cell-${tablePosition}` ||
          inputField.id === `cell-${tablePosition - 1}`) &&
        e.key !== "Enter" &&
        e.key !== "Backspace" &&
        !isNaN(Number(e.key))
      ) {
        novaLinha();
      }
    });
  });

  document.querySelectorAll(".fi-input.fi-min").forEach((inputField) => {
    inputField.addEventListener("input", (e) => {
      if (Number(inputField.value) < 1 && inputField.value !== "") {
        inputField.value = 1;
      }
    });
  });
}
formatarInput();

function habilitarCzuberSeClasse() {
  if (componentId !== "classes") {
    document
      .querySelector(".task[data='moda-czuber']")
      .classList.add("naopode");
  } else {
    document
      .querySelector(".task[data='moda-czuber']")
      .classList.remove("naopode");
  }
}
habilitarCzuberSeClasse();

document.querySelector("#unidadeInput").addEventListener("input", (e) => {
  tipoUnidade = e.target.value;
  tipoUnidade = tipoUnidade.trim();
  document.querySelectorAll(".unidade-texto").forEach((unidade) => {
    if (tipoUnidade !== "") {
      unidade.textContent = tipoUnidade;
    } else {
      tipoUnidade = "Unidade";
      unidade.textContent = tipoUnidade;
    }
  });
});

document.querySelector("#nova-linha").addEventListener("click", () => {
  novaLinha();
});

document.querySelector("#remover-linha").addEventListener("click", () => {
  removerLinha();
});

document.querySelector("#apagar-tabela").addEventListener("click", () => {
  placeholderSize = 3;
  t = 0;
  document.querySelector("#dataEntries").innerHTML = `
    <tr>
      <th colspan="3" class="unidade-texto">
        Unidade
      </th>
    </tr>
    <tr id="row-placeholder">
      <td></td>
      <td></td>
      <td></td>
    </tr>
  `;
});

document.querySelectorAll(".task").forEach((task) => {
  task.addEventListener("click", () => {
    task.classList.toggle("done");
  });
});
