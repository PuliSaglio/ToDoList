document.addEventListener('DOMContentLoaded' , function(){
    const form = document.getElementById('formNovaTarefa');
    const modal = document.getElementById('modalTarefa');

    const btnAbrirModal = document.getElementById('btnAbrirModal');
    const btnFecharModal = document.getElementById('btnFecharModal');
    const botaoReset = document.getElementById('btnResetForm');

    form.addEventListener('submit', function(event){
        event.preventDefault();
        const cardTarefa = criarCardTarefa(coletarDadosForm());
        estilizarCardTarefa(cardTarefa);
        adicionarTarefa(cardTarefa);
        cardTarefa.botaoMais.addEventListener('click' , function(){
            cardTarefa.descricao.classList.toggle('d-none');
            cardTarefa.dataCriacao.classList.toggle('d-none');
        });

        form.reset();
        modal.classList.add('d-none');
    });

    btnAbrirModal.addEventListener('click', function(){
        const hoje = new Date().toISOString().split('T')[0];
        document.getElementById('dataTarefa').value = hoje;
        modal.classList.remove('d-none');
    });

    btnFecharModal.addEventListener('click', function(){
        modal.classList.add('d-none');
    });

    botaoReset.addEventListener('click', function(){
        form.reset();
    });

});

const colunaTodo = document.getElementById('colunaAfazer');


function dataAtualFormatada(){
    const data = new Date();
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = String(data.getFullYear()).slice(-2);

    return `${dia}/${mes}/${ano}`;
}


function coletarDadosForm(){
    const tituloTarefa = document.getElementById('tituloTarefa').value;
    const descricaoTarefa = document.getElementById('descricaoTarefa').value;
    const dataTarefa = formataData(document.getElementById('dataTarefa').value);
    const prioridadeTarefa = document.getElementById('prioridadeTarefa').value;
    const notificacaoTarefa = document.querySelector('input[name="notificacao"]:checked').value;

    const tarefa = {
        titulo: tituloTarefa,
        descricao: descricaoTarefa,
        data: dataTarefa,
        prioridade: prioridadeTarefa,
        notificacao: notificacaoTarefa,
        dataCriacao: dataAtualFormatada()
    };

    return tarefa;
}

function criarCardTarefa(tarefa){
    const cardSombreado = document.createElement('div');
    const novaTarefa = document.createElement('div');
    const cabecalhoCard = document.createElement('div');
    const badge = document.createElement('span');

    const botaoMais = document.createElement('button');
    const iconeBotao = document.createElement('i');
    const tituloTarefa = document.createElement('h5');
    tituloTarefa.innerHTML = tarefa.titulo;

    const descricaoTarefa = document.createElement('p');
    descricaoTarefa.innerHTML = tarefa.descricao;

    const dataTarefa = document.createElement('time');
    dataTarefa.innerHTML = tarefa.data;

    const prioridadeTarefa = document.createElement('div');
    prioridadeTarefa.innerHTML = tarefa.prioridade;

    const notificacaoTarefa = document.createElement('p');
    notificacaoTarefa.innerHTML = tarefa.notificacao;

    const dataCriacao = document.createElement('p');
    dataCriacao.innerHTML = tarefa.dataCriacao;

    const cardTarefa = {
        containerSombreado: cardSombreado,
        containerTarefa: novaTarefa,
        cabecalho: cabecalhoCard,
        badge: badge,
        botaoMais: botaoMais,
        iconeBotao: iconeBotao,
        titulo: tituloTarefa,
        descricao: descricaoTarefa,
        data: dataTarefa,
        prioridade: prioridadeTarefa,
        notificacao: notificacaoTarefa,
        dataCriacao : dataCriacao
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
    cardTarefa.prioridade.style = "width: 100%";
    cardTarefa.prioridade.style = "height: 8px; border-radius: 5px; margin-bottom: 4px;";
    cardTarefa.botaoMais.className = "btn btn-sm btn-outline-secondary";
    cardTarefa.botaoMais.title = "Ver Mais";
    cardTarefa.botaoMais.type = "button";
    cardTarefa.botaoMais.style = "height: 20px ; padding-top: 0px;"
    cardTarefa.iconeBotao.className = "bi bi-chevron-down";

    cardTarefa.descricao.classList.add('d-none');
    cardTarefa.dataCriacao.classList.add('d-none');

    if(cardTarefa.prioridade.innerHTML == 'ALTA'){
        cardTarefa.prioridade.className = "progress-bar bg-danger";
        cardTarefa.prioridade.title = "Prioridade: Alta";
    }
    else if(cardTarefa.prioridade.innerHTML == 'MEDIA'){
        cardTarefa.prioridade.className = "progress-bar bg-warning";
        cardTarefa.prioridade.title = "Prioridade: Média";
    }
    else{
        cardTarefa.prioridade.className = "progress-bar bg-success";
        cardTarefa.prioridade.title = "Prioridade: Baixa";
    }

    cardTarefa.prioridade.innerHTML = "";
}

function adicionarTarefa(cardTarefa){
    cardTarefa.badge.appendChild(cardTarefa.data)
    cardTarefa.containerTarefa.appendChild(cardTarefa.prioridade);
    cardTarefa.containerTarefa.appendChild(cardTarefa.cabecalho);
    cardTarefa.cabecalho.appendChild(cardTarefa.titulo);
    cardTarefa.cabecalho.appendChild(cardTarefa.badge);
    cardTarefa.containerTarefa.appendChild(cardTarefa.descricao);
    cardTarefa.containerTarefa.appendChild(cardTarefa.dataCriacao);
    cardTarefa.containerTarefa.appendChild(cardTarefa.botaoMais);
    cardTarefa.botaoMais.appendChild(cardTarefa.iconeBotao);
    colunaTodo.appendChild(cardTarefa.containerSombreado);
    cardTarefa.containerSombreado.appendChild(cardTarefa.containerTarefa);
}

function expandirCardTarefa(cardTarefa){
    cardTarefa.descricao.classList.remove('d-none');
    cardTarefa.dataCriacao.classList.remove('d-none');

}

function formataData(data){
    let [ano, mes, dia] = data.split('-');

    return `${dia}/${mes}/${ano}`;
}