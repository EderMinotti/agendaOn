import api from "./api.js"


const caixaExcluir = document.querySelector(".container-excluir")
let idAgendamentoParaExcluir = null; // variável para guardar o ID do agendamento

caixaExcluir.addEventListener("click", async (evento) => {
    const botaoClicado = evento.target.dataset.acao;

    switch (botaoClicado) {
        case "excluir":
            try {
                await api.excluirAgendamento(idAgendamentoParaExcluir)
                ui.renderizarAgendamentos()

            } catch (error) {
                alert("erro ao excluir")
            }

            break;

        case "cancelar":
            caixaExcluir.style.display = "none";
            break;

        default:
            break;
    }
})



const ui = {

    async renderizarAgendamentos() {
        const listaAgendamentos = document.querySelector(".ul-agendamentos");

        listaAgendamentos.innerHTML = ""

        try {
            const agendamentos = await api.buscarAgendamentos()
            agendamentos.forEach(ui.adicionarAgendamentoNaLista);
        } catch (error) {
            alert("erro ao renderizar agendamento")
        }

    },


    adicionarAgendamentoNaLista(agendamento) {
        const li = document.createElement("li")
        li.classList.add("item-lista-agendamentos")

        const containerAgendamentos = document.createElement("div")
        containerAgendamentos.classList.add("container-agendamentos")

        const paragrafoTitulo = document.createElement("p")
        paragrafoTitulo.textContent = agendamento.titulo
        paragrafoTitulo.classList.add("agendamento-titulo")

        const paragrafo = document.createElement("p")
        paragrafo.textContent = `Local: ${agendamento.local}`

        const paragrafoData = document.createElement("p")
        paragrafoData.classList.add("agendamento-data")
        paragrafoData.textContent = agendamento.data
        const imagemAgenda = document.createElement("img")
        imagemAgenda.classList.add("imagem-agenda")
        imagemAgenda.src = "assets/agenda_13753138.png"
        imagemAgenda.alt = "Agenda"

        const containerImagemLixeira = document.createElement("div")
        containerImagemLixeira.classList.add("container-imagem-lixeira");

        const imagemLixeira = document.createElement("img")
        imagemLixeira.src = "assets/delete.png"

        const botaoExcluir = document.createElement("button")
        botaoExcluir.classList.add("botao-delete");

        botaoExcluir.append(imagemLixeira);

        botaoExcluir.onclick = () => {
            idAgendamentoParaExcluir = agendamento.id; // guarda o id do item clicado
            caixaExcluir.style.display = "grid";
            caixaExcluir.scrollIntoView();
        };



        containerAgendamentos.append(paragrafoTitulo, paragrafo, paragrafoData, imagemAgenda);
        containerImagemLixeira.appendChild(botaoExcluir)

        li.append(containerAgendamentos, containerImagemLixeira)
        const ulAgendamentos = document.querySelector(".ul-agendamentos")
        ulAgendamentos.appendChild(li)

    }
}






export default ui;

