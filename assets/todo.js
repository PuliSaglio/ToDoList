document.addEventListener('DOMContentLoaded' , function(){
    const form = document.getElementById('formNovaTarefa');
    const modal = document.getElementById('modalTarefa');
    const modalEdit = document.getElementById('modalEditTarefa');
    const formEdit = document.getElementById('formEditTarefa');

    const btnAbrirModal = document.getElementById('btnAbrirModal');
    const btnFecharModal = document.getElementById('btnFecharModal');

    const btnFecharModalEdit = document.getElementById('btnFecharModalEdit');

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

        cardTarefa.botaoEdit.addEventListener('click' , function(){
            modalEdit.classList.remove('d-none');
            document.getElementById('tituloTarefaEdit').value = cardTarefa.titulo.innerText;
            document.getElementById('descricaoTarefaEdit').value = cardTarefa.descricao.innerText;
            document.getElementById('dataTarefaEdit').value = desformataData(cardTarefa.data.innerText);
            document.getElementById('prioridadeTarefaEdit').value = cardTarefa.prioridade.innerText;

            const notificacao = cardTarefa.notificacao.innerHTML.trim().toLowerCase();
            console.log(notificacao);

            if (notificacao === 'sim') {
                document.getElementById('notificaSimEdit').checked = true;
            } else {
                document.getElementById('notificaNaoEdit').checked = true;
            }
        });

        cardTarefa.botaoApaga.addEventListener('click' , function(){
            cardTarefa.containerSombreado.remove();
        });

        form.reset();
        modal.classList.add('d-none');
    });

    formEdit.addEventListener('submit', function(event){
        event.preventDefault();
        modalEdit.classList.add('d-none');  
        
    });

    btnAbrirModal.addEventListener('click', function(){
        const hoje = new Date().toISOString().split('T')[0];
        document.getElementById('dataTarefa').value = hoje;
        modal.classList.remove('d-none');
    });

    btnFecharModal.addEventListener('click', function(){
        modal.classList.add('d-none');
    });

    btnFecharModalEdit.addEventListener('click', function(){
        modalEdit.classList.add('d-none');
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


function coletarDadosFormEdit(){
    const tituloTarefa = document.getElementById('tituloTarefaEdit').value;
    const descricaoTarefa = document.getElementById('descricaoTarefaEdit').value;
    const dataTarefa = formataData(document.getElementById('dataTarefaEdit').value);
    const prioridadeTarefa = document.getElementById('prioridadeTarefaEdit').value;
    const notificacaoTarefa = document.querySelector('input[name="notificacaoEdit"]:checked').value;

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
    //separar em funçao que cria os elementos e outra que atribui valores
    const cardSombreado = document.createElement('div');
    const novaTarefa = document.createElement('div');
    const cabecalhoCard = document.createElement('div');
    const badge = document.createElement('span');
    const divBotoes = document.createElement('div');
    const divBotoesEditApaga = document.createElement('div');

    const botaoMais = document.createElement('button');
    const iconeBotaoMais = document.createElement('i');
    const botaoEdit = document.createElement('button');
    const iconeBotaoEdit = document.createElement('i');
    const botaoApaga = document.createElement('button');
    const iconeBotaoApaga = document.createElement('i');

    const tituloTarefa = document.createElement('h5');
    tituloTarefa.innerHTML = tarefa.titulo;

    const descricaoTarefa = document.createElement('p');
    descricaoTarefa.innerHTML = tarefa.descricao;

    const dataTarefa = document.createElement('time');
    dataTarefa.innerHTML = tarefa.data;

    const prioridadeTarefa = document.createElement('div');
    prioridadeTarefa.innerHTML = `<p>${tarefa.prioridade}</p>`;

    const notificacaoTarefa = document.createElement('p');
    notificacaoTarefa.innerHTML = tarefa.notificacao;

    const dataCriacao = document.createElement('p');
    dataCriacao.innerHTML = tarefa.dataCriacao;

    const cardTarefa = {
        containerSombreado: cardSombreado,
        containerTarefa: novaTarefa,
        cabecalho: cabecalhoCard,
        badge: badge,
        divBotoes: divBotoes,
        divBotoesEditApaga: divBotoesEditApaga,
        botaoMais: botaoMais,
        iconeBotaoMais: iconeBotaoMais,
        botaoEdit: botaoEdit,
        iconeBotaoEdit: iconeBotaoEdit,
        botaoApaga: botaoApaga,
        iconeBotaoApaga: iconeBotaoApaga,
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

    cardTarefa.divBotoes.className = "d-flex justify-content-between align-items-center";

    cardTarefa.divBotoesEditApaga.className = "d-flex gap-2";

    estilizarBotaoMais(cardTarefa.botaoMais);
    cardTarefa.iconeBotaoMais.className = "bi bi-chevron-down";

    estilizarBotaoEdit(cardTarefa.botaoEdit);
    cardTarefa.iconeBotaoEdit.className = "bi bi-pencil";

    estilizarBotaoApaga(cardTarefa.botaoApaga);
    cardTarefa.iconeBotaoApaga.className = "bi bi-trash";


    cardTarefa.descricao.classList.add('d-none');
    cardTarefa.dataCriacao.classList.add('d-none');

    if(cardTarefa.prioridade.innerText == 'ALTA'){
        cardTarefa.prioridade.className = "progress-bar bg-danger";
        cardTarefa.prioridade.title = "Prioridade: Alta";
    }
    else if(cardTarefa.prioridade.innerText == 'MEDIA'){
        cardTarefa.prioridade.className = "progress-bar bg-warning";
        cardTarefa.prioridade.title = "Prioridade: Média";
    }
    else{
        cardTarefa.prioridade.className = "progress-bar bg-success";
        cardTarefa.prioridade.title = "Prioridade: Baixa";
    }

    cardTarefa.prioridade.getElementsByTagName("p").className = "d-none";

}

function estilizarBotaoMais(botaoMais){
    botaoMais.className = "btn btn-sm btn-outline-secondary";
    botaoMais.title = "Ver Mais";
    botaoMais.type = "button";
    botaoMais.style = "height: 20px ; padding-top: 0px;"
}

function estilizarBotaoEdit(botaoEdit){
    botaoEdit.className = "btn btn-sm btn-outline-primary";
    botaoEdit.title = "Editar";
    botaoEdit.type = "button";
    botaoEdit.style = "height: 20px ; padding-top: 0px;"
}

function estilizarBotaoApaga(botaoApaga){
    botaoApaga.className = "btn btn-sm btn-outline-danger";
    botaoApaga.title = "Apagar";
    botaoApaga.type = "button";
    botaoApaga.style = "height: 20px ; padding-top: 0px;"
}

function adicionarTarefa(cardTarefa){
    cardTarefa.badge.appendChild(cardTarefa.data)
    cardTarefa.containerTarefa.appendChild(cardTarefa.prioridade);
    cardTarefa.containerTarefa.appendChild(cardTarefa.cabecalho);
    cardTarefa.cabecalho.appendChild(cardTarefa.titulo);
    cardTarefa.cabecalho.appendChild(cardTarefa.badge);
    cardTarefa.containerTarefa.appendChild(cardTarefa.descricao);
    cardTarefa.containerTarefa.appendChild(cardTarefa.dataCriacao);
    cardTarefa.containerTarefa.appendChild(cardTarefa.divBotoes)
    cardTarefa.divBotoes.appendChild(cardTarefa.botaoMais);
    cardTarefa.botaoMais.appendChild(cardTarefa.iconeBotaoMais);
    cardTarefa.divBotoes.appendChild(cardTarefa.divBotoesEditApaga);
    cardTarefa.divBotoesEditApaga.appendChild(cardTarefa.botaoEdit);
    cardTarefa.botaoEdit.appendChild(cardTarefa.iconeBotaoEdit);
    cardTarefa.divBotoesEditApaga.appendChild(cardTarefa.botaoApaga);
    cardTarefa.botaoApaga.appendChild(cardTarefa.iconeBotaoApaga);
    colunaTodo.appendChild(cardTarefa.containerSombreado);
    cardTarefa.containerSombreado.appendChild(cardTarefa.containerTarefa);
}

function formataData(data){
    let [ano, mes, dia] = data.split('-');

    return `${dia}/${mes}/${ano}`;
}

function desformataData(data){
    let [dia, mes, ano] = data.split('/');

    return `${ano}-${mes}-${dia}`;
}