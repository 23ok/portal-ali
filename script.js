
const csvUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQC0_whhxRy61P6fQ5yEDvdPjjNETtfMhu_4_pJdAMHuJhfMXZCVp_cZjtnuOmh4ylE00SC_8fKSDfz/pub?output=csv";

async function carregarCasos() {
  const res = await fetch(csvUrl);
  const csv = await res.text();
  const linhas = csv.split("\n").slice(1);
  const container = document.getElementById("casos-container");
  container.innerHTML = "";

  linhas.forEach(linha => {
    const col = linha.split(",");
    if (col.length < 10) return;
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h2>${col[0]}</h2>
      <p><strong>Programa:</strong> ${col[1]}</p>
      <p><strong>Setor:</strong> ${col[2]}</p>
      <p><strong>Tipo:</strong> ${col[3]}</p>
      <p><strong>Região:</strong> ${col[4]}</p>
      <p><strong>Desafio:</strong> ${col[5]}</p>
      <p><strong>Solução:</strong> ${col[6]}</p>
      <p><strong>Resultado:</strong> ${col[7]}</p>
      <p><strong>Indicadores:</strong> ${col[8]}</p>
      <p><strong>Obs.:</strong> ${col[9]}</p>
    `;
    container.appendChild(card);
  });

  document.getElementById("busca").addEventListener("input", function() {
    const termo = this.value.toLowerCase();
    document.querySelectorAll(".card").forEach(card => {
      card.style.display = card.innerText.toLowerCase().includes(termo) ? "block" : "none";
    });
  });
}

carregarCasos();
