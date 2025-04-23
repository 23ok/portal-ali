const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQC0_whhxRy61P6fQ5yEDvdPjjNETtfMhu_4_pJdAMHuJhfMXZCVp_cZjtnuOmh4ylE00SC_8fKSDfz/pub?output=csv";

const programaClassMap = {
  "ALI Produtividade": "produtividade",
  "ALI Educação Empreendedora": "educacao",
  "ALI Ecossistemas": "ecossistemas",
  "ALI Rural": "rural",
  "ALI Indicações Geográficas": "indicacoes"
};

fetch(sheetURL)
  .then(response => response.text())
  .then(data => {
    const lines = data.trim().split("\n");
    const headers = lines[0].split(",");
    const container = document.getElementById("casos-container");
    container.innerHTML = "";

    lines.slice(1).forEach(line => {
      const values = line.split(",");
      const entry = Object.fromEntries(headers.map((h, i) => [h.trim(), values[i]?.trim()]));

      const div = document.createElement("div");
      const className = programaClassMap[entry["Programa"]] || "";
      div.className = `caso ${className}`;
      div.innerHTML = `
        <h2>${entry["Empresa"]}</h2>
        <p><strong>Programa:</strong> ${entry["Programa"]}</p>
        <p><strong>Setor:</strong> ${entry["Setor"]}</p>
        <p><strong>Tipo:</strong> ${entry["Tipo"]}</p>
        <p><strong>Região:</strong> ${entry["Região"]}</p>
        <p><strong>Desafio:</strong> ${entry["Desafio"]}</p>
        <p><strong>Solução:</strong> ${entry["Solução"]}</p>
        <p><strong>Resultado:</strong> ${entry["Resultado"]}</p>
        <p><strong>Indicadores:</strong> ${entry["Indicadores"]}</p>
        <p><strong>Obs.:</strong> ${entry["Obs."]}</p>
      `;
      container.appendChild(div);
    });

    document.getElementById("busca").addEventListener("input", function() {
      const query = this.value.toLowerCase();
      document.querySelectorAll(".caso").forEach(caso => {
        caso.style.display = caso.innerText.toLowerCase().includes(query) ? "" : "none";
      });
    });
  });
