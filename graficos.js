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

  const freqAcumulada = data.map((val, i) =>
    data.slice(0, i + 1).reduce((a, b) => a + b, 0),
  );

  const ctx = document.getElementById("myChart");

  if (chartInstance) {
    chartInstance.destroy();
  }

  const maxValue = Math.max(...freqAcumulada);
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
          yAxisID: "y",
        },
        {
          label: "Frequência Acumulada",
          data: freqAcumulada,
          type: "line",
          borderColor: "rgba(255, 99, 132, 1)",
          backgroundColor: "rgba(255, 99, 132, 0.3)",
          borderWidth: 2,
          fill: false,
          tension: 0,
          yAxisID: "y",
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: true },
        title: {
          display: true,
          text: "Distribuição dos Valores + Frequência Acumulada",
          font: { size: 16, weight: "bold" },
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
          title: { display: true, text: "Frequência" },
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

function desenharGraficoClasses(classes) {
  const labels = classes.map((c) => `${c.li} – ${c.ls}`);
  const data = classes.map((c) => c.fi);

  const freqAcumulada = data.map((val, i) =>
    data.slice(0, i + 1).reduce((a, b) => a + b, 0),
  );

  const ctx = document.getElementById("myChart");

  if (chartInstance) {
    chartInstance.destroy();
  }

  const maxValue = Math.max(...freqAcumulada);
  const suggestedMax = maxValue + Math.ceil(maxValue * 0.2);

  chartInstance = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Frequência",
          data: data,
          backgroundColor: "rgba(54, 162, 235, 0.6)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
          yAxisID: "y",
        },
        {
          label: "Frequência Acumulada",
          data: freqAcumulada,
          type: "line",
          borderColor: "rgba(255, 99, 132, 1)",
          backgroundColor: "rgba(255, 99, 132, 0.3)",
          borderWidth: 2,
          fill: false,
          tension: 0,
          yAxisID: "y",
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: true },
        title: {
          display: true,
          text: "Histograma de Classes + Frequência Acumulada",
          font: { size: 16, weight: "bold" },
        },
      },
      scales: {
        x: {
          title: { display: true, text: "Classes" },
        },
        y: {
          beginAtZero: true,
          suggestedMax: suggestedMax,
          title: { display: true, text: "Frequência" },
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
