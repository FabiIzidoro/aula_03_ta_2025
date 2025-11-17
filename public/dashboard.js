const socket = io();

const imgEscudo = document.getElementById("escudo");
const input = document.getElementById("resposta");
const btn = document.getElementById("btnEnviar");
const rankingLista = document.getElementById("ranking");

let escudoAtual;

// Recebe novo escudo
socket.on("novoEscudo", (escudo) => {
    escudoAtual = escudo;
    imgEscudo.src = escudo.url;
});

// Envia resposta
btn.onclick = () => {
    const texto = input.value.trim();
    if (texto !== "") {
        socket.emit("resposta", texto);
        input.value = "";
    }
};

// atualiza ranking
socket.on("ranking", (jogadores) => {
    rankingLista.innerHTML = "";

    const arr = Object.entries(jogadores)
        .sort((a, b) => b[1].pontos - a[1].pontos);

    arr.forEach(([id, dados]) => {
        const li = document.createElement("li");
        li.textContent = `${id.substring(0, 5)} - ${dados.pontos} pontos`;
        rankingLista.appendChild(li);
    });
});
