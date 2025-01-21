"use strict";
const inputTarefa = document.getElementById("input-tarefa");
const inputPonto = document.getElementById("input-ponto");
const btnAdicionar = document.getElementById("adicionar-tarefa");
const listaAbertas = document.getElementById("lista-tarefas-abertas");
const listaConcluidas = document.getElementById("lista-tarefas-concluidas");
const totalXp = document.getElementById("xp");
const mensagemListaVazia = document.getElementById("mensagem-lista-vazia");
// Variável que armazena o total de XP
let xpTotal = 0;
// Atualiza a exibição da mensagem de lista vazia
function atualizarMensagemListaVazia() {
    mensagemListaVazia.style.display =
        listaAbertas.children.length === 0 ? "block" : "none"; // Mostra mensagem se a lista aberta estiver vazia
}
// Atualiza o valor de XP total na tela
function atualizarXpTotal() {
    totalXp.textContent = xpTotal.toString(); // Define o valor atualizado
}
// Cria um novo item de lista
function criarItemLista(titulo, xp, lista) {
    // Criação do elemento da tarefa
    const li = document.createElement("li");
    const container = document.createElement("div");
    container.classList.add("lista-item-container");
    const item = document.createElement("div");
    item.classList.add("container-item");
    // Checkbox para marcar como concluído
    const checkboxContainer = document.createElement("div");
    checkboxContainer.classList.add("container-checkbox");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("input-checkbox");
    checkbox.id = `checkbox-${Date.now()}`; // ID único
    const checkboxLabel = document.createElement("label");
    checkboxLabel.htmlFor = checkbox.id;
    const checkboxCustom = document.createElement("div");
    checkboxCustom.classList.add("checkbox-customizado");
    // Monta o checkbox e adiciona ao item
    checkboxLabel.appendChild(checkbox);
    checkboxLabel.appendChild(checkboxCustom);
    checkboxContainer.appendChild(checkboxLabel);
    // Adiciona título e XP ao item
    const tituloTarefa = document.createElement("p");
    tituloTarefa.textContent = titulo;
    const xpTarefa = document.createElement("span");
    xpTarefa.textContent = xp.toString();
    item.appendChild(checkboxContainer);
    item.appendChild(tituloTarefa);
    item.appendChild(xpTarefa);
    container.appendChild(item);
    // Botões de ação (remover e editar)
    const containerBotoes = document.createElement("div");
    containerBotoes.classList.add("container-botao-tarefa");
    // Botão de remover
    const botaoRemover = document.createElement("button");
    botaoRemover.classList.add("tarefa-button");
    const imagemRemover = document.createElement("img");
    imagemRemover.src = "./images/delete.png";
    imagemRemover.alt = "Remover";
    botaoRemover.appendChild(imagemRemover);
    containerBotoes.appendChild(botaoRemover);
    // Evento para remover o item
    botaoRemover.addEventListener("click", () => {
        if (confirm("Tem certeza que deseja excluir este inimigo?")) {
            if (checkbox.checked) {
                xpTotal -= parseInt(xpTarefa.textContent || "0", 10); // Subtrai o XP se o item estiver concluído
                atualizarXpTotal();
            }
            // Remove o item da lista correta (aberta ou concluída)
            if (checkbox.checked) {
                listaConcluidas.removeChild(li);
            }
            else {
                listaAbertas.removeChild(li);
            }
            atualizarMensagemListaVazia();
        }
    });
    // Botão de editar (somente para itens de lista aberta)
    const botaoEditar = document.createElement("button");
    if (lista === listaAbertas) {
        botaoEditar.classList.add("tarefa-button");
        const imagemEditar = document.createElement("img");
        imagemEditar.src = "./images/edit.png";
        imagemEditar.alt = "Editar";
        botaoEditar.appendChild(imagemEditar);
        containerBotoes.appendChild(botaoEditar);
        // Evento para editar o título e XP
        botaoEditar.addEventListener("click", () => {
            const novoTitulo = prompt("Digite um novo nome para o inimigo:", tituloTarefa.textContent || "");
            if (novoTitulo) {
                tituloTarefa.textContent = novoTitulo;
                const novoXp = prompt("Digite o novo valor de XP:", xpTarefa.textContent || "");
                if (novoXp && !isNaN(parseInt(novoXp, 10)) && parseInt(novoXp, 10) > 0) {
                    if (checkbox.checked) {
                        xpTotal +=
                            parseInt(novoXp, 10) - parseInt(xpTarefa.textContent || "0", 10); // Atualiza XP se concluído
                        atualizarXpTotal();
                    }
                    xpTarefa.textContent = novoXp;
                }
                else {
                    alert("Valor de XP inválido.");
                }
            }
        });
    }
    container.appendChild(containerBotoes);
    li.appendChild(container);
    lista.appendChild(li);
    // Evento para checkbox de conclusão
    checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
            lista.removeChild(li);
            listaConcluidas.appendChild(li); // Move para a lista de concluídos
            xpTotal += parseInt(xpTarefa.textContent || "0", 10); // Adiciona XP
            checkboxCustom.classList.add("checked");
            tituloTarefa.style.textDecoration = "line-through";
            containerBotoes.removeChild(botaoEditar); // Remove botão editar
        }
        else {
            listaConcluidas.removeChild(li);
            listaAbertas.appendChild(li); // Move para a lista de abertos
            xpTotal -= parseInt(xpTarefa.textContent || "0", 10); // Subtrai XP
            checkboxCustom.classList.remove("checked");
            tituloTarefa.style.textDecoration = "none";
            containerBotoes.appendChild(botaoEditar); // Re-adiciona botão editar
        }
        atualizarXpTotal();
        atualizarMensagemListaVazia();
    });
    atualizarMensagemListaVazia();
}
// Evento do botão de adicionar nova tarefa
btnAdicionar.addEventListener("click", (e) => {
    e.preventDefault();
    const titulo = inputTarefa.value.trim(); // Obtém o título
    const xp = parseInt(inputPonto.value.trim(), 10); // Obtém o XP
    // Validação de entrada
    if (!titulo || isNaN(xp) || xp <= 0) {
        alert("Informe um título e um valor de XP válido para a tarefa.");
        return;
    }
    // Criação do novo item na lista aberta
    criarItemLista(titulo, xp, listaAbertas);
    // Limpa os campos de entrada
    inputTarefa.value = "";
    inputPonto.value = "";
});
