let chartInstance = null;

function desenharGrafico(values) {
  const mapa = {};
  values.forEach((x) => {
    mapa[x] = (mapa[x] || 0) + 1;
  });

  const labels = Object.keys(mapa)
    .map(Number)
    .sort((a, b) => a - b);

  const data = labels.map((label) => mapa[label]);

  const ctx = document.getElementById("myChart");

  if (chartInstance) {
    chartInstance.destroy();
  }

  const maxValue = Math.max(...data);
  const suggestedMax = maxValue + Math.ceil(maxValue * 0.2);

  chartInstance = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Frequência dos Valores",
          data: data,
          backgroundColor: "rgba(54, 162, 235, 0.6)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: "Distribuição dos Valores",
          font: {
            size: 16,
            weight: "bold",
          },
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text:
              document.querySelector("#unidadeInput").value !== ""
                ? tipoUnidade
                : "Unidade",
          },
        },
        y: {
          beginAtZero: true,
          suggestedMax: suggestedMax,
          title: {
            display: true,
            text: "Frequência",
          },
          ticks: {
            callback: function (value) {
              return Number.isInteger(value) ? value : null;
            },
          },
        },
      },
    },
  });
}
