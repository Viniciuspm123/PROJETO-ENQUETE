// Carregar opções de voto
async function carregarOpcoes() {
  try {
    const res = await fetch("api/opcoes");
    const opcoes = await res.json();

    const div = document.getElementById("opcoes-voto");
    div.innerHTML = "";

    opcoes.forEach(op => {
      const btn = document.createElement("button");
      btn.textContent = op.nome;
      btn.onclick = () => votar(op.id);
      div.appendChild(btn);
    });
  } catch (err) {
    console.error("Erro ao carregar opções:", err);
  }
}

// Função votar
async function votar(id) {
  try {
    await fetch("api/votar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    });
    carregarResultados(); // Atualiza os resultados após votar
  } catch (err) {
    console.error("Erro ao votar:", err);
  }
}

// Carregar resultados
async function carregarResultados() {
  try {
    const res = await fetch("/api/resultados");
    const lista = await res.json();

    const div = document.getElementById("lista-resultados");
    div.innerHTML = "";

    lista.forEach(item => {
      const p = document.createElement("p");
      p.textContent = `${item.nome}: ${item.votos} votos`;
      div.appendChild(p);
    });
  } catch (err) {
    console.error("Erro ao carregar resultados:", err);
  }
}

// Inicializar página
carregarOpcoes();
carregarResultados();
