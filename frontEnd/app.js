console.log("App.js funcionando");

const API = "http://localhost:3000/lerveiculos";
const APIPagamento = "http://localhost:3000/atualizarpagamento";
const APIDelete = "http://localhost:3000/deletarveiculo";
async function carregar() {
    const res = await fetch(API);
    const dados = await res.json();
    const tabela = document.getElementById("tabela");
    tabela.innerHTML = "";
    console.log(dados);
    dados.forEach((carro) => {
        tabela.innerHTML += `
        <tr>
        <td>${carro.id}</td>
        <td>${carro.placa}</td>
        <td>${carro.modelo}</td>
        <td>${carro.pago ? "✅ Sim" : "❌ Não "}</td>
        <td>
            <button onclick="pagar(${carro.id}, ${carro.pago})">
                PATCH ${carro.pago ? '<span style="color:blue">Cancelar</span>' : '<span style="color:green">Pagar</span>'} 
            </button>
             <button onclick="deletar(${carro.id})" style="color:red; margin-left:5px;">
                    🗑️ Excluir
                </button>
        </td>
    </tr>
    `
    })
}
async function pagar(id, pagoAtual) {
    console.log(id)
    console.log(pagoAtual)
    await fetch(`${APIPagamento}/${id}`, {
        method: "PATCH",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ pago: !pagoAtual })
    })
    carregar();
}
async function deletar(id) {
    if (!confirm("Tem certeza que deseja excluir este veículo?")) return;

    await fetch(`${APIDelete}/${id}`, {
        method: "DELETE"
    });

    carregar();
}
// Ao abrir a página chama a função carregar
carregar();