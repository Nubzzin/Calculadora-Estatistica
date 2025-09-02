// Alternar menu mobile
document.getElementById("menuToggle").addEventListener("click", function () {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("active");
});

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
  values = [];
  // Adicionar eventos de clique aos itens de navegação
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.addEventListener("click", function () {
      const pageId = this.getAttribute("data-page");
      changePage(pageId);
    });
  });

  // Adicionar eventos de clique aos botões com atributo data-page
  document.querySelectorAll("button[data-page]").forEach((button) => {
    button.addEventListener("click", function () {
      const pageId = this.getAttribute("data-page");
      if (pageId !== "infos") {
        changePage(pageId);
      } else {
        if (values.length > 0) {
          changePage(pageId);
        } else {
          showNotification("Você não digitou nenhum valor.");
        }
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
    left: 50%;
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

  let placeholderSize = 3;
  // Adicionar evento de clique ao botão "Próxima Etapa"
  document.querySelector("#dataInput").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      let rowPlaceholder = document.querySelector("#row-placeholder");
      let inputSec = document.querySelector("#dataInput");
      try {
        values.push(Number(inputSec.value));
        console.log("Array: ", values);
        inputSec.value = "";
      } catch (err) {
        showNotification("Entrada inválida. Por favor, insira um número.");
      }
      let table = document.querySelector("#dataEntries");
      let row = table.rows[0];
      if (placeholderSize > 0) {
        rowPlaceholder.deleteCell(rowPlaceholder.cells.length - 1);
        placeholderSize--;
      }
      let cell = row.insertCell(0);
      if (values.length % 3 == 0) {
        console.log(values.length);
        row = table.insertRow(0);
      }
      cell.textContent = values[values.length - 1];
    }
  });
});

document.querySelectorAll(".task").forEach((task) => {
  task.addEventListener("click", () => {
    task.classList.toggle("done");
  });
});
