const presentes = [
  "Aparelho de jantar",
  "Conjunto de panelas antiaderentes",
  "Jogo de copos",
  "Liquidificador"
];

const lista = document.getElementById("lista");

function carregar() {
  lista.innerHTML = "";
  const dadosSalvos = JSON.parse(localStorage.getItem("presentes")) || {};

  presentes.forEach(presente => {
    const div = document.createElement("div");
    div.className = "item";

    if (dadosSalvos[presente]) {
      div.classList.add("selecionado");
      div.innerHTML = `
        <h3>${presente}</h3>
        <p>✔ Escolhido por ${dadosSalvos[presente]}</p>
        <button onclick="desmarcar('${presente}')">Desmarcar</button>
      `;
    } else {
      div.innerHTML = `
        <h3>${presente}</h3>
        <input type="text" placeholder="Seu nome">
        <button onclick="confirmar('${presente}')">Confirmar</button>
      `;
    }

    lista.appendChild(div);
  });
}

function confirmar(presente) {
  const input = event.target.previousElementSibling;
  const nome = input.value.trim();

  if (nome === "") {
    alert("Digite seu nome");
    return;
  }

  const dadosSalvos = JSON.parse(localStorage.getItem("presentes")) || {};
  dadosSalvos[presente] = nome;

  localStorage.setItem("presentes", JSON.stringify(dadosSalvos));
  carregar();
}

function desmarcar(presente) {
  const confirmarNome = prompt("Digite o nome usado para confirmar:");

  const dadosSalvos = JSON.parse(localStorage.getItem("presentes")) || {};

  if (confirmarNome === dadosSalvos[presente]) {
    delete dadosSalvos[presente];
    localStorage.setItem("presentes", JSON.stringify(dadosSalvos));
    carregar();
  } else {
    alert("Nome incorreto. Apenas quem marcou pode desmarcar.");
  }
}

carregar();