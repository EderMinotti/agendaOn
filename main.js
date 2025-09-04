import ui from "./ui.js"
import api from "./api.js"

atualizarHoras();
setInterval(atualizarHoras, 2000)
setInterval(diaOuNoite, 2000)

const dataContainer = document.querySelector(".paragrafo-dia-da-semana")
const btnNovoAgendamento = document.getElementById("botao-novo-agendamento");

const containerAgenda = document.querySelector(".container-agenda")
const form = document.getElementById("form-agenda")
const botaoFechar = document.getElementById("botao-fechar");
const botaoNotificacao = document.querySelector(".link-notificacoes");
const imagemInicial = document.querySelector(".imagem-dia-da-semana");
const ulNotificacoes = document.querySelector(".ul-notificacoes")
const notificacaoNumero = document.querySelector(".notificacao-numero");

document.addEventListener("DOMContentLoaded", () => {
    ui.renderizarAgendamentos()
    form.addEventListener("submit", manipularSubmissaoDoFormulario);
    const dataNaTela = data()
    dataContainer.textContent = dataNaTela;
    diaOuNoite()
    compararDatas()
    exibirNotificações()
    solicitarPermissaoNotificacoes()


})

async function solicitarPermissaoNotificacoes() {
    if (!("Notification" in window)) {
        alert("Seu navegador não suporta notificações");
        return;
    }

    const permissao = await Notification.requestPermission();
    if (permissao !== "granted") {
        alert("Você precisa permitir notificações para recebê-las");
    }
}


async function exibirNotificações() {
    const notificações = await compararDatas();
    const quantidadeNotificacoes = notificações.length;
    notificacaoNumero.style.display = quantidadeNotificacoes === 0 ? "none" : "block"

    const titulosNotificacoes = notificações.map(notificacao => notificacao.titulo)
    notificacaoNumero.textContent = `${quantidadeNotificacoes}`
    ulNotificacoes.innerHTML = ""


    titulosNotificacoes.forEach(item => {


        ulNotificacoes.innerHTML += `
        
        <div class="container-itens-notificacoes">
            <img class="imagem-alerta-vermelho" src="assets/alerta-vermelho.png" alt="">
            <li class="item-notificacoes-hoje">o compromisso ${item} é hoje</li>
        </div>
        `

        if (Notification.permission === "granted") {
            new Notification("Compromisso hoje", {
                body: `O compromisso "${item}" é hoje!`,
                icon: "assets/alerta-vermelho.png"
            });
        }


    });



}


btnNovoAgendamento.onclick = () => {
    form.style.display = "flex"
    setTimeout(() => {
        form.classList.add("mostrar-form")
    }, 10);
}

botaoFechar.onclick = () => {
    form.classList.remove("mostrar-form");
    setTimeout(() => {
        form.style.display = "none"
    }, 10);

}

botaoNotificacao.onclick = () => {
    const container = document.querySelector(".container-notificacoes");
    container.style.display = container.style.display === "flex" ? "none" : "flex";
    setTimeout(() => {
        container.classList.toggle("mostrar-notificacoes")
    }, 10);
}



export function data() {

    const dataAtual = new Date().toLocaleDateString("pt-br", { weekday: "long", year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
    const fraseData = `${dataAtual}`

    return fraseData
}

function atualizarHoras() {
    const agora = new Date();
    const horaAtual = agora.toLocaleTimeString("pt-br", { hour: "2-digit", minute: "2-digit" })
    document.querySelector(".relogio").textContent = horaAtual;
}

async function manipularSubmissaoDoFormulario(evento) {
    evento.preventDefault();

    const id = document.getElementById("pensamento-id")
    const titulo = document.getElementById("agenda-titulo").value;
    const local = document.getElementById("agenda-local").value;
    const data = document.getElementById("agenda-data").value;

    if (!validarData(data)) {
        const mensagemErro = document.querySelector(".mensagem-erro");
        mensagemErro.style.display = "block"
        return;
    }

    const dataFormatada = formatarData(data)

    try {
        await api.postarAgendamentos({ titulo, local, data: dataFormatada })

    } catch (error) {
        alert("erro ao manipular submissão do formulario")
    }


}

function validarData(data) {
    const dataAtual = new Date();
    const dataInserida = new Date(data)

    dataAtual.setHours(0, 0, 0, 0);
    dataInserida.setHours(0, 0, 0, 0);

    return dataInserida >= dataAtual
}


function diaOuNoite() {
    const horarioAtual = new Date().toLocaleString("pt-br", { hour: "2-digit" });
    if (horarioAtual >= 19) {
        imagemInicial.src = "assets/lua.png"
    } else {
        imagemInicial.src = "assets/sol.png"
    }
}

function formatarData(data) {
    var options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "UTC"
    }
    return new Date(data).toLocaleDateString("pt-BR", options)
}

async function compararDatas() {
    const dataAtual = new Date().toLocaleDateString("pt-br", { weekday: "long", year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
    const agendamentos = await api.buscarAgendamentos();
    const agendamentosFiltrados = agendamentos.filter(agendamento => agendamento.data == dataAtual)
    return agendamentosFiltrados;
}

