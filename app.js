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
      const pageId = this.getAttribute("data-page");
      changePage(pageId);
    });
  });

  // Adicionar eventos de clique aos botões com atributo data-page
  document.querySelectorAll("button[data-page]").forEach((button) => {
    button.addEventListener("click", function () {
      const pageId = this.getAttribute("data-page");
      changePage(pageId);
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
            bottom: 20px;
            right: 20px;
            background-color: #2c3e50;
            color: white;
            padding: 1rem;
            border-radius: 4px;
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

  // Exemplo: Adicionar evento de clique aos cards
  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", (e) => {
      // Não acionar se um botão foi clicado
      if (e.target.tagName !== "BUTTON") {
        showNotification("Card clicado!");
      }
    });
  });

  // Você pode adicionar mais funcionalidades JavaScript aqui conforme necessário
});
