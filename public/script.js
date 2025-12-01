// Carregar opções de voto
fetch("/opcoes")
    .then(res => res.json())
    .then(opcoes => {
        const div = document.getElementById("opcoes-voto");
        div.innerHTML = "";

        opcoes.forEach(op => {
            div.innerHTML += `
                <button onclick="votar(${op.id})">${op.nome}</button>
            `;
        });
    });

// Função votar
function votar(id) {
    fetch("/votar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
    })
    .then(res => res.json())
    .then(() => carregarResultados());
}

// Carregar resultados
function carregarResultados() {
    fetch("/resultados")
        .then(res => res.json())
        .then(lista => {
            const div = document.getElementById("lista-resultados");
            div.innerHTML = "";

            lista.forEach(item => {
                div.innerHTML += `<p>${item.nome}: ${item.votos} votos</p>`;
            });
        });
}

// Carregar no início
carregarResultados();
