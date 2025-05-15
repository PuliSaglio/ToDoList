document.addEventListener('DOMContentLoaded' , function(){
    const form = document.getElementById('formNovaTarefa');

    form.addEventListener('submit', function(event){
        event.preventDefault();
        const cardTarefa = criarCardTarefa(coletarDadosForm());
        estilizarCardTarefa(cardTarefa);
        adicionarTarefa(cardTarefa);

        modal.classList.add('d-none');
    });
});

const colunaTodo = document.getElementById('colunaAfazer');

const btnAbrirModal = document.getElementById('btnAbrirModal');
const btnFecharModal = document.getElementById('btnFecharModal');

const modal = document.getElementById('modalTarefa');


btnAbrirModal.onclick = () => modal.classList.remove('d-none');
btnFecharModal.onclick = () => modal.classList.add('d-none');

function coletarDadosForm(){
    const tituloTarefa = document.getElementById('tituloTarefa').value;
    const descricaoTarefa = document.getElementById('descricaoTarefa').value;
    const dataTarefa = document.getElementById('dataTarefa').value;
    const prioridadeTarefa = document.getElementById('prioridadeTarefa').value;
    const notificacaoTarefa = document.querySelector('input[name="notificacao"]:checked').value;

    const tarefa = {
        titulo: tituloTarefa,
        descricao: descricaoTarefa,
        data: dataTarefa,
        prioridade: prioridadeTarefa,
        notificacao: notificacaoTarefa,
        dataCriacao: new Date()
    };

    return tarefa;
}

function criarCardTarefa(tarefa){
    const cardSombreado = document.createElement('div');
    const novaTarefa = document.createElement('div');
    const cabecalhoCard = document.createElement('div');
    const badge = document.createElement('span');

    const tituloTarefa = document.createElement('h5');
    tituloTarefa.innerHTML = tarefa.titulo;

    const descricaoTarefa = document.createElement('p');
    descricaoTarefa.innerHTML = tarefa.descricao;

    const dataTarefa = document.createElement('time');
    dataTarefa.innerHTML = tarefa.data;

    const prioridadeTarefa = document.createElement('p');
    prioridadeTarefa.innerHTML = tarefa.prioridade;

    const notificacaoTarefa = document.createElement('p');
    notificacaoTarefa.innerHTML = tarefa.notificacao;

    const cardTarefa = {
        containerSombreado: cardSombreado,
        containerTarefa: novaTarefa,
        cabecalho: cabecalhoCard,
        badge: badge,
        titulo: tituloTarefa,
        descricao: descricaoTarefa,
        data: dataTarefa,
        prioridade: prioridadeTarefa,
        notificacao: notificacaoTarefa
    };

    return cardTarefa;
    
}

function estilizarCardTarefa(cardTarefa){
    cardTarefa.containerSombreado.className = "card shadow-sm mb-3";
    cardTarefa.containerTarefa.className = "card-body";
    cardTarefa.cabecalho.className = "d-flex justify-content-between align-items-center mb-2";
    cardTarefa.badge.className = "badge bg-primary";
    cardTarefa.titulo.className = "card-title mb-0";
    cardTarefa.descricao.className = "card-text ms-2 mb-2";
    cardTarefa.prioridade.className = "fw-bold text-danger mb-0"
}

function adicionarTarefa(cardTarefa){
    cardTarefa.badge.appendChild(cardTarefa.data)
    cardTarefa.containerTarefa.appendChild(cardTarefa.cabecalho);
    cardTarefa.cabecalho.appendChild(cardTarefa.titulo);
    cardTarefa.cabecalho.appendChild(cardTarefa.badge);
    cardTarefa.containerTarefa.appendChild(cardTarefa.descricao);
    cardTarefa.containerTarefa.appendChild(cardTarefa.prioridade);
    colunaTodo.appendChild(cardTarefa.containerSombreado);
    cardTarefa.containerSombreado.appendChild(cardTarefa.containerTarefa);
}