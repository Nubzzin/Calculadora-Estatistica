let values = [];
let informacoes = [];
let placeholderSize = 3;
let t = 0;
let pageId = "";
let tablePosition = 2;

// Alternar menu mobile
document.getElementById("menuToggle").addEventListener("click", function () {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("active");
});

function novaLinha() {
  let table = document.querySelector("#dataEntriesFi");
  let row = table.insertRow();
  let cell = row.insertCell();
  cell.innerHTML = `<input type="number" class="centered-input fi-input" data="${tablePosition}">`;
  tablePosition++;
  cell = row.insertCell();
  cell.innerHTML = `<input type="number" class="centered-input fi-input" data="${tablePosition}">`;
  tablePosition++;

  document.querySelectorAll("input[data]").forEach((inputField) => {
    inputField.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        let table = document.querySelector("#dataEntriesFi");
        if (Number(inputField.value) === 0) {
          inputField.value = 0;
        }
        console.log(
          inputField.getAttribute("data"),
          " - ",
          Number(inputField.value),
        );
      }
    });
  });
}

function reiniciarTasks() {
  document.querySelectorAll(".task").forEach((task) => {
    task.classList.remove("done");
  });
}

function reiniciar() {
  reiniciarTasks();
  document.querySelector("#dataEntries").innerHTML =
    '<tr id="row-placeholder"><td></td><td></td><td></td></tr>';
  document.querySelector(
    "#dataEntriesFi",
  ).innerHTML = `<tr> <th>Xi</th> <th>Fi</th> </tr> <tr> <td> <input type="number" class="centered-input fi-input" data="0" /> </td> <td> <input type="number" class="centered-input fi-input" data="1" /> </td> </tr>`;
  values = [];
  informacoes = [];
  placeholderSize = 3;
  t = 0;
  console.log(values);
  console.log(informacoes);
  changePage("inicio");
}

function mudarComponente(componenteId) {
  document.querySelectorAll(".component").forEach((component) => {
    component.classList.remove("active");
  });
  document.getElementById(componenteId).classList.add("active");
}

// Função para mudar páginas
function changePage(pageId) {
  // Esconder todas as páginas
  document.querySelectorAll(".page").forEach((page) => {
    page.classList.remove("active");
  });

  // Mostrar a página selecionada
  document.getElementById(pageId).classList.add("active");

  // Atualizar item de navegação ativo
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.classList.remove("active");
  });

  document
    .querySelector(`.nav-item[data-page="${pageId}"]`)
    .classList.add("active");

  document
    .querySelector(`.nav-item[data-page="${pageId}"]`)
    .classList.add("active");

  document
    .querySelector(`.nav-item[data-page="${pageId}"]`)
    .classList.remove("deactive");

  // Fechar menu mobile se estiver aberto
  const sidebar = document.getElementById("sidebar");
  if (sidebar.classList.contains("active")) {
    sidebar.classList.remove("active");
  }
}

// Configurar event listeners quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", function () {
  // Adicionar eventos de clique aos itens de navegação
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.addEventListener("click", function () {
      pageId = this.getAttribute("data-page");
      changePage(pageId);
    });
  });

  // Adicionar eventos de clique aos botões com atributo data-page
  document.querySelectorAll("button[data-page]").forEach((button) => {
    button.addEventListener("click", function () {
      pageId = this.getAttribute("data-page");
      if (pageId === "resultados") {
        if (informacoes.length > 0 && values.length > 0) {
          changePage(pageId);
        } else if (values.length === 0) {
          showNotification("Você não digitou nenhum dado.");
        } else {
          showNotification("Você não selecionou nada.");
        }
      } else if (pageId === "resultados") {
        reiniciar();
      } else {
        changePage(pageId);
      }
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
      bottom: 80px; /* raised a little higher than 20px */
      left: 60%;
      transform: translateX(-50%);
      background-color: #2c3e50;
      color: white;
      padding: 1rem;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.2);
      z-index: 1000;
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
      let rowPlaceholder = document.querySelector("#row-placeholder");
      try {
        values.push(Number(inputTabela.value));
        console.log("Array: ", values);
        inputTabela.value = "";
      } catch (err) {
        showNotification("Entrada inválida. Por favor, insira um número.");
      }
      let table = document.querySelector("#dataEntries");
      let row = table.rows[0];
      if (placeholderSize > 0) {
        rowPlaceholder.deleteCell(t);
        placeholderSize--;
      }
      let cell = row.insertCell(t);
      t++;
      if (values.length % 3 == 0) {
        row = table.insertRow(0);
        t = 0;
      }
      cell.textContent = values[values.length - 1];
    }
  });
  document.querySelectorAll("input[data]").forEach((inputField) => {
    inputField.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        let table = document.querySelector("#dataEntriesFi");
        if (Number(inputField.value) === 0) {
          inputField.value = 0;
        }
        console.log(
          inputField.getAttribute("data"),
          " - ",
          Number(inputField.value),
        );
      }
    });
  });
});

document.querySelector("#nova-linha").addEventListener("click", () => {
  novaLinha();
});

document.querySelectorAll(".task").forEach((task) => {
  task.addEventListener("click", () => {
    let data = task.getAttribute("data");
    if (!informacoes.find((info) => info === data)) {
      informacoes.push(data);
    } else {
      informacoes = informacoes.filter((info) => info !== data);
    }
    console.log(informacoes);
    task.classList.toggle("done");
  });
});
