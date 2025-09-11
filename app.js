let values = [];
let informacoes = [];
let placeholderSize = 3;
let t = 0;
let pageId = "dados";
let componentId = "tabela";
let tipoUnidade = "Unidade";
let tablePosition = 1;
let classPosition = 2;
let repetida = false;
let diff = 0;

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

function calcDiff() {
  diff =
    document.querySelector(`#class-cell-1`).value -
    document.querySelector(`#class-cell-0`).value;
}

function lerTabela() {
  values = [];
  if (componentId === "fi") {
    let table = document.querySelector("#dataEntriesFi");
    let rows = table.querySelectorAll("tr");
    rows.forEach((row) => {
      let inputs = row.querySelectorAll("input");
      inputs.forEach((input) => {
        if (input.value !== "") {
          values.push(Number(input.value));
        }
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
  } else if (componentId === "classes") {
    let table = document.querySelector("#dataEntriesClasses");
    if (
      table.rows[2].cells[0].querySelector("input").value === "" ||
      table.rows[2].cells[1].querySelector("input").value === ""
    ) {
      showNotification("Preencha as colunas Li e Ls.");
      return [];
    } else if (
      table.rows[2].cells[0].querySelector("input").value ===
      table.rows[2].cells[1].querySelector("input").value
    ) {
      showNotification("As colunas Li e Ls não podem ser iguais");
      repetida = true;
      return [];
    }
    let rows = table.rows;
    for (let row of rows) {
      let inputs = row.querySelectorAll("input");
      values.push({
        li: Number(inputs[0]?.value),
        ls: Number(inputs[1]?.value),
        fi: Number(inputs[2]?.value || 1),
      });
    }
    values.shift();
    values.shift();
    console.log("Lendo Classes: ", values);
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

function novaLinhaClasse() {
  let table = document.querySelector("#dataEntriesClasses");
  if (
    table.rows[2].cells[0].querySelector("input").value === "" ||
    table.rows[2].cells[1].querySelector("input").value === ""
  ) {
    showNotification(
      "Preencha as colunas Li e Ls antes de adicionar novas linhas",
    );
    return;
  } else if (
    table.rows[2].cells[0].querySelector("input").value ===
    table.rows[2].cells[1].querySelector("input").value
  ) {
    showNotification("As colunas Li e Ls não podem ser iguais");
    return;
  }
  table.rows[2].cells[0].querySelector("input").classList.add("disabled");
  table.rows[2].cells[1].querySelector("input").classList.add("disabled");
  let row = table.insertRow(-1);
  let cell = row.insertCell();
  calcDiff();
  classPosition++;
  cell.innerHTML = `<input type="number" class="centered-input class-input disabled" id="class-cell-${classPosition}" placeholder="..." value="${
    document.querySelector(`#class-cell-${classPosition - 2}`).value
  }">`;
  cell = row.insertCell();
  classPosition++;
  cell.innerHTML = `<input type="number" class="centered-input class-input class-min disabled" id="class-cell-${classPosition}" placeholder="..." value="${
    Number(document.querySelector(`#class-cell-${classPosition - 1}`).value) +
    diff
  }">`;
  cell = row.insertCell();
  classPosition++;
  cell.innerHTML = `<input type="number" class="centered-input class-input class-min" id="class-cell-${classPosition}" placeholder="1" min="1">`;
  document.querySelector(`#class-cell-${classPosition}`).focus();
  formatarInput();
}

function removerLinhaClasse() {
  let table = document.querySelector("#dataEntriesClasses");
  if (table.rows.length > 3) {
    table.deleteRow(-1);
    classPosition -= 3;
  } else {
    for (let i = 0; i < 3; i++) {
      table.rows[2].cells[i].querySelector("input").value = "";
    }
  }

  if (table.rows.length === 3) {
    for (let i = 0; i < 2; i++) {
      table.rows[2].cells[i]
        .querySelector("input")
        .classList.remove("disabled");
    }
  }
}

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
  pageId = "dados";
  changePage(pageId);
}

function nomeModa(value) {
  let result = "";
  switch (value) {
    case 0:
      result = "Amodal";
      break;
    case 1:
      result = "Unimodal: ";
      break;
    case 2:
      result = "Bimodal: ";
      break;
    case 3:
      result = "Trimodal: ";
      break;
    case 4:
      result = "Tetramodal: ";
      break;
    case 5:
      result = "Pentamodal: ";
      break;
    case 6:
      result = "Hexamodal: ";
      break;
    case 7:
      result = "Heptamodal: ";
      break;
    case 8:
      result = "Octomodal: ";
      break;
    case 9:
      result = "Enneamodal: ";
      break;
    case 10:
      result = "Decamodal: ";
      break;
    default:
      result = "Polimodal: ";
  }
  return result;
}

// Função para mudar páginas
function changePage(pageId) {
  if (pageId !== "resultados" && tipoUnidade === "Unidade") {
    tipoUnidade = "u";
  }

  if (pageId === "decisao") {
    document.querySelectorAll(".task").forEach((page) => {
      page.classList.remove("done");
    });
    document.querySelector("#unidadeInput").value = "";
    tipoUnidade = "Unidade";
    apagarTabela();
    apagarTabelaFi();
    apagarTabelaClasses();
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
    result.innerText = Math.round(media(values) * 1000) / 1000;
    result.innerText += " " + tipoUnidade;
    result.parentElement.classList.add("active");
  }
  if (informacoes.find((x) => x === "moda")) {
    let modaV = moda(values);
    let modaN = nomeModa(modaV[0].length);
    result = document.querySelector("#resultado-moda");
    result.innerText = modaN;
    if (modaN !== "Amodal") {
      for (let i = 0; i < modaV[0].length - 1; i++) {
        result.innerText += " " + modaV[0][i] + " |";
      }
      result.innerText += " " + modaV[0][modaV[0].length - 1];
    }
    // result.innerText += " " + modaV[0];
    result.parentElement.classList.add("active");
  }
  if (informacoes.find((x) => x === "moda-bruta")) {
    let modaV = modaBruta(values);
    let modaN = nomeModa(modaV[0].length);
    result = document.querySelector("#resultado-moda-bruta");
    result.innerText = modaN;
    if (modaN !== "Amodal") {
      for (let i = 0; i < modaV[0].length; i++) {
        result.innerText +=
          " (" + modaV[0][i][0] + " - " + modaV[0][i][1] + ")";
      }
    }
    result.parentElement.classList.add("active");
  }
  if (informacoes.find((x) => x === "moda-czuber")) {
    let modaV = modaCzuber(values);
    result = document.querySelector("#resultado-moda-czuber");
    if (componentId === "classes") {
      if (modaV[1] < 0) {
        result.innerText = "Não é possível aplicar Czuber";
      } else {
        result.innerText =
          Math.round(modaV[0] * 1000) / 1000 + " " + tipoUnidade;
      }
    } else {
      result.innerText = "Apenas para classes";
    }
    result.parentElement.classList.add("active");
  }
  if (informacoes.find((x) => x === "mediana")) {
    result = document.querySelector("#resultado-mediana");
    result.innerText = Math.round(mediana(values) * 1000) / 1000;
    result.innerText += " " + tipoUnidade;
    result.parentElement.classList.add("active");
  }
  if (informacoes.find((x) => x === "variancia")) {
    result = document.querySelector("#resultado-variancia");
    let v = Math.round(variancia(values) * 1000) / 1000;
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
    let cv =
      Math.round(
        coeficienteVariacao(
          desvioPadrao(variancia(values)),
          agrupamentoDiscreto(values),
          values,
        ) * 1000,
      ) / 1000;
    let tem3maisDecimal = Math.abs(cv * 100 - Math.round(cv * 100)) > 0;
    cv = Math.round(cv * 1000) / 1000;
    if (isFinite(cv) && cv > 0) {
      result.innerText = cv;
      result.innerText += "%";
    } else {
      result.innerText = "Não Possui/Indefinido";
    }
    result.parentElement.classList.add("active");
  }
  if (informacoes.find((x) => x === "agrupamento")) {
    result = document.querySelector("#resultado-agrupamento");
    result.innerText = Math.round(agrupamentoDiscreto(values)[1] * 1000) / 1000;
    result.parentElement.classList.add("active");
  }
  if (informacoes.find((x) => x === "desvio")) {
    result = document.querySelector("#resultado-desvio");
    let dp = Math.round(desvioPadrao(variancia(values)) * 1000) / 1000;
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
        todosFeitos = true;
        if (componentId === "fi") {
          document.querySelectorAll(".fi-input").forEach((input) => {
            if (!input.value) {
              todosFeitos = false;
            }
          });
        }
        if (componentId === "classes") {
          document.querySelectorAll(".class-input").forEach((input) => {
            if (!input.value) {
              todosFeitos = false;
            }
          });
        }
        if (informacoes.length > 0 && values.length > 0) {
          values.sort((a, b) => a - b);
          if (componentId !== "classes") {
            desenharGrafico(values);
          } else {
            desenharGraficoClasses(values);
          }
          changePage(pageId);
        } else if (values.length === 0) {
          if (componentId === "fi" && !todosFeitos) {
            if (repetida) {
              showNotification(
                "Valores repetidos encontrados na coluna esquerda.",
              );
            } else {
              showNotification("Preencha pelo menos uma linha.");
            }
          } else if (componentId === "classes" && !todosFeitos) {
            if (repetida) {
              showNotification("As colunas Li e Ls não podem ser iguais.");
            } else {
              showNotification("Preencha as colunas Li e Ls.");
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

  let inputTabela = document.querySelector("#dataInput");
  inputTabela.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && inputTabela.value !== "") {
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
  document.querySelectorAll(".fi-input").forEach((inputField, index) => {
    inputField.addEventListener("keypress", (e) => {
      if (
        (inputField.id === `cell-${tablePosition}` ||
          inputField.id === `cell-${tablePosition - 1}`) &&
        !isNaN(Number(e.key))
      ) {
        novaLinha();
      }
      if (e.key === "Enter" && e.target.value !== "") {
        let inputId = Number(inputField.id.split("-")[1]) + 1;
        document.querySelector(`#cell-${inputId}`).focus();
      }
    });
  });

  document.querySelectorAll(".fi-input.fi-min").forEach((inputField) => {
    inputField.addEventListener("input", (e) => {
      if (Number(inputField.value) < 1 && inputField.value !== "") {
        inputField.value = 1;
      }
      inputField.value = inputField.value.replace(".", "");
    });
  });

  document.querySelectorAll(".class-input.lils").forEach((inputField) => {
    inputField.addEventListener("keypress", (e) => {
      if (e.key === "Enter" && e.target.value !== "") {
        let inputId = Number(inputField.id.split("-")[2]) + 1;
        document.querySelector(`#class-cell-${inputId}`).focus();
      }
    });
  });

  document.querySelectorAll(".class-input.class-min").forEach((inputField) => {
    inputField.addEventListener("input", (e) => {
      if (Number(inputField.value) < 1 && inputField.value !== "") {
        inputField.value = 1;
      }
      inputField.value = inputField.value.replace(".", "");
    });
    inputField.addEventListener("keypress", (e) => {
      if (
        e.key === "Enter" &&
        Number(inputField.id.split("-")[2]) === classPosition
      ) {
        novaLinhaClasse();
      }
    });
  });
}
formatarInput();

function habilitarCzuberSeClasse() {
  if (componentId !== "classes") {
    document.querySelector(".task[data='moda-czuber']").style.display = "none";
    document.querySelector(".task[data='moda-bruta']").style.display = "none";
    document.querySelector(".task[data='moda']").style.display = "block";
  } else {
    document.querySelector(".task[data='moda-czuber']").style.display = "block";
    document.querySelector(".task[data='moda-bruta']").style.display = "block";
    document.querySelector(".task[data='moda']").style.display = "none";
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

document.querySelector("#nova-linha-classes").addEventListener("click", () => {
  novaLinhaClasse();
});

document
  .querySelector("#remover-linha-classes")
  .addEventListener("click", () => {
    removerLinhaClasse();
  });

function apagarTabela() {
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
  placeholderSize = 3;
  t = 0;
}

function apagarTabelaFi() {
  document.querySelector("#dataEntriesFi").innerHTML = `
  <tr>
    <th class="unidade-texto">Unidade</th>
    <th>Fi</th>
  </tr>
  <tr><th colspan="2" style="padding: 0px; background-color: #80c888;">Linhas incompletas serão ignoradas</th></tr>
  <tr>
    <td>
      <input
        type="number"
        class="centered-input fi-input"
        id="cell-0"
        placeholder="..."
      />
    </td>
    <td>
      <input
        type="number"
        class="centered-input fi-input fi-min"
        id="cell-1"
        placeholder="..."
        min="1"
      />
    </td>
  </tr>
  `;
  tablePosition = 1;
  formatarInput();
}

function apagarTabelaClasses() {
  document.querySelector("#dataEntriesClasses").innerHTML = `
  <tr>
    <th colspan="3" class="unidade-texto">Unidade</th>
  </tr>
  <tr>
    <th>Li</th>
    <th>Ls</th>
    <th>Fi</th>
  </tr>
  <tr>
    <td>
      <input
        type="number"
        class="centered-input class-input lils"
        id="class-cell-0"
        placeholder="..."
      />
    </td>
    <td>
      <input
        type="number"
        class="centered-input class-input lils"
        id="class-cell-1"
        placeholder="..."
      />
    </td>
    <td>
      <input
        type="number"
        class="centered-input class-input class-min"
        id="class-cell-2"
        placeholder="1"
      />
    </td>
  </tr>
    `;
  classPosition = 2;
  formatarInput();
}

document.querySelector("#apagar-tabela").addEventListener("click", () => {
  placeholderSize = 3;
  t = 0;
  apagarTabela();
});

// document
//   .querySelector("#apagar-tabela-classes")
//   .addEventListener("click", () => {
//     apagarTabelaClasses();
//   });

document.querySelectorAll(".task").forEach((task) => {
  task.addEventListener("click", () => {
    task.classList.toggle("done");
  });
});
