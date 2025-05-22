document.addEventListener('DOMContentLoaded' , function(){
    const form = document.getElementById('formNovaTarefa');
    const modal = document.getElementById('modalTarefa');
    const modalEdit = document.getElementById('modalEditTarefa');
    const formEdit = document.getElementById('formEditTarefa');
    let tarefaEmEdicao = null;

    let contadorTarefa = 0;

    const btnAbrirModal = document.getElementById('btnAbrirModal');
    const btnFecharModal = document.getElementById('btnFecharModal');

    const btnFecharModalEdit = document.getElementById('btnFecharModalEdit');

    const botaoReset = document.getElementById('btnResetForm');

    carregarTarefasSalvas();



    document.getElementById('filtroOrdenacao').addEventListener('change', function() {
        const criterio = this.value;
        tarefas = iterarTarefas(contadorTarefa);
        contadorTarefa++;
        arrayOrdenado = ordenarTarefas(criterio, tarefas);
        reordenarTarefas(arrayOrdenado, contadorTarefa);
    });


    document.getElementById('colunaAfazer').addEventListener('click', function(event) {
        const botao = event.target.closest('button');
        if (!botao) return;

        const card = botao.closest('.card');
        if (!card) return;

        const descricao = card.querySelector('.descricao');
        const dataCriacao = card.querySelectorAll('.dataCriacao')[0];
        const notificacao = card.querySelector('.notificacao');

        // Ver Mais
        if (botao.title === 'Ver Mais') {
            descricao?.classList.toggle('d-none');
            dataCriacao?.classList.toggle('d-none');
            notificacao?.classList.toggle('d-none');
            return;
        }

        // Editar
        if (botao.title === 'Editar') {
            modalEdit.classList.remove('d-none');
            tarefaEmEdicao = obterCardTarefa(card);
            preencherFormularioEdicao(tarefaEmEdicao);
            contadorTarefa++;
            return;
        }

        // Apagar
        if (botao.title === 'Apagar') {
            card.remove(); // Remove o card inteiro
            return;
        }
    });

    form.addEventListener('submit', function(event){
        event.preventDefault();
        const cardTarefa = criarCardTarefa(coletarDadosForm(), contadorTarefa);
        contadorTarefa++;
        estilizarCardTarefa(cardTarefa);
        adicionarTarefa(cardTarefa);
        salvarTarefaNoLocalStorage(cardTarefa);
        form.reset();
        modal.classList.add('d-none');
    });

    formEdit.addEventListener('submit', function(event){
        event.preventDefault();
        modalEdit.classList.add('d-none');  
        const dadosFormEdit = coletarDadosFormEdit();

        removerTarefaDoLocalStorage(tarefaEmEdicao.idTarefa);
        tarefaEmEdicao.titulo.innerText = dadosFormEdit.titulo;
        tarefaEmEdicao.descricao.innerText = dadosFormEdit.descricao;
        tarefaEmEdicao.data.innerText = dadosFormEdit.data;
        tarefaEmEdicao.prioridade.innerHTML = `<p>${dadosFormEdit.prioridade}</p>`;
        tarefaEmEdicao.notificacao.innerHTML = dadosFormEdit.notificacao;
        salvarTarefaNoLocalStorage(tarefaEmEdicao);

        estilizarCardTarefa(tarefaEmEdicao);
        tarefaEmEdicao = null;
    });

    function preencherFormularioEdicao(cardTarefa){
            document.getElementById('tituloTarefaEdit').value = cardTarefa.titulo.innerText;
            document.getElementById('descricaoTarefaEdit').value = cardTarefa.descricao.innerText;
            document.getElementById('dataTarefaEdit').value = desformataData(cardTarefa.data.innerText);
            document.getElementById('prioridadeTarefaEdit').value = cardTarefa.prioridade.innerText;

            const notificacao = cardTarefa.notificacao.innerHTML.trim().toLowerCase();
            if (notificacao === 'sim') {
                document.getElementById('notificaSimEdit').checked = "true";
            } else {
                document.getElementById('notificaNaoEdit').checked = "true";
            }
    }

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

function criarCardTarefa(tarefa, contadorTarefa){
    //separar em funçao que cria os elementos e outra que atribui valores
    const idTarefa = contadorTarefa;
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
    dataCriacao.innerHTML = `<p>Data de criação: ${tarefa.dataCriacao}</p>`;

    

    const cardTarefa = {
        idTarefa: idTarefa,
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
    cardTarefa.containerSombreado.setAttribute('id', cardTarefa.idTarefa);
    cardTarefa.containerSombreado.className = "card shadow-sm mb-3";
    cardTarefa.containerSombreado.draggable = "true";
    cardTarefa.containerSombreado.addEventListener('dragstart', drag);

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


    cardTarefa.descricao.classList = "descricao";
    cardTarefa.notificacao.classList = "notificacao";
    cardTarefa.dataCriacao.classList = "dataCriacao";

    cardTarefa.descricao.classList.add('d-none');
    cardTarefa.dataCriacao.classList.add('d-none');
    cardTarefa.notificacao.classList.add('d-none');

    if(cardTarefa.prioridade.innerText == 'ALTA'){
        cardTarefa.prioridade.className = "progress-bar bg-danger";
        cardTarefa.prioridade.getElementsByTagName("p")[0].className = "text-danger";
        cardTarefa.prioridade.title = "Prioridade: Alta";
    }
    else if(cardTarefa.prioridade.innerText == 'MEDIA'){
        cardTarefa.prioridade.className = "progress-bar bg-warning";
        cardTarefa.prioridade.getElementsByTagName("p")[0].className = "text-warning";
        cardTarefa.prioridade.title = "Prioridade: Média";
    }
    else{
        cardTarefa.prioridade.className = "progress-bar bg-success";
        cardTarefa.prioridade.getElementsByTagName("p")[0].className = "text-success";
        cardTarefa.prioridade.title = "Prioridade: Baixa";
    }

    
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
    cardTarefa.containerTarefa.appendChild(cardTarefa.notificacao);
    cardTarefa.containerTarefa.appendChild(cardTarefa.divBotoes);
    cardTarefa.divBotoes.appendChild(cardTarefa.botaoMais);
    cardTarefa.botaoMais.appendChild(cardTarefa.iconeBotaoMais);
    cardTarefa.divBotoes.appendChild(cardTarefa.divBotoesEditApaga);
    cardTarefa.divBotoesEditApaga.appendChild(cardTarefa.botaoEdit);
    cardTarefa.botaoEdit.appendChild(cardTarefa.iconeBotaoEdit);
    cardTarefa.divBotoesEditApaga.appendChild(cardTarefa.botaoApaga);
    cardTarefa.botaoApaga.appendChild(cardTarefa.iconeBotaoApaga);
    colunaTodo.appendChild(cardTarefa.containerSombreado);
    cardTarefa.containerSombreado.appendChild(cardTarefa.containerTarefa);

    const dadosTarefa = extrairDadosDaTarefa(cardTarefa);

    cardTarefa.cabecalho.addEventListener('click', () => {
        localStorage.setItem('tarefaSelecionada', JSON.stringify(dadosTarefa));
        window.location.href = 'detalhe.html';
    });

}



function formataData(data){
    let [ano, mes, dia] = data.split('-');

    return `${dia}/${mes}/${ano}`;
}

function desformataData(data){
    let [dia, mes, ano] = data.split('/');

    return `${ano}-${mes}-${dia}`;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    const elemento = document.getElementById(data);
  
    if (ev.target.classList.contains('task-column')) {
        ev.target.appendChild(elemento);
    }
}

function extrairDadosDaTarefa(cardTarefa) {
    console.log(cardTarefa);
    return {
        id: cardTarefa.idTarefa,
        titulo: cardTarefa.titulo.innerText,
        descricao: cardTarefa.descricao.innerText,
        data: cardTarefa.data.innerText,
        prioridade: cardTarefa.prioridade,
        dataCriacao: cardTarefa.dataCriacao.innerText.replace(/^Data de criação: \s*/, ''),
        notificacao: cardTarefa.notificacao.innerText
    };
}


function extrairDadosDoCard(card) {
    const idTarefa = parseInt(card.id);
    const prioridade = card.querySelector('.progress-bar p')?.innerText.trim(); 
    const titulo = card.querySelector('.card-title')?.innerText.trim();         
    const data = card.querySelector('time')?.innerText.trim();            
    const descricao = card.querySelector('.descricao')?.innerText.trim();       
    const dataCriacao = card.querySelectorAll('.dataCriacao')[0]?.innerText
    .replace('Data de criação:', '')
    .trim();
    const notificacao = Array.from(card.querySelectorAll('p'))
    .map(p => p.innerText.trim().toLowerCase())
    .find(txt => txt === 'sim' || txt === 'nao');

    return {
        idTarefa,
        prioridade,
        titulo,
        data,
        descricao,
        dataCriacao,
        notificacao
    };
}

function iterarTarefas(){
    const listaTarefas = document.getElementsByClassName("card shadow-sm mb-3");
    const tarefas = Array.from(listaTarefas).map(tarefa => extrairDadosDoCard(tarefa));

    return tarefas;
}

function ordenarTarefas(criterio, tarefas) {
  switch (criterio) {
    case 'dataCriacao':
      tarefas.sort((a, b) => new Date(a.dataCriacao) - new Date(b.dataCriacao));
      break;
    case 'dataTarefa':
        tarefas.sort((a, b) => {
            const dataA = desformataData(a.data);
            const dataB = desformataData(b.data);
            return new Date(dataA) - new Date(dataB);
        });
        break;
    case 'prioridade':
      const ordem = { 'ALTA': 1, 'MEDIA': 2, 'BAIXA': 3 };
      tarefas.sort((a, b) => ordem[a.prioridade] - ordem[b.prioridade]);
      break;
    case 'descricao':
      tarefas.sort((a, b) => a.descricao.localeCompare(b.descricao));
      break;
  }

  return tarefas;
}

function reordenarTarefas(arrayOrdenado) {
  const container = document.getElementById('colunaAfazer');
  container.innerHTML = ''; 

  arrayOrdenado.forEach(dados => {
    const card = criarCardTarefa(dados, dados.idTarefa); 
    estilizarCardTarefa(card);           
    adicionarTarefa(card);               
  });
}

function obterCardTarefa(card) {
  return {
    idTarefa: parseInt(card.id),
    containerSombreado: card,
    containerTarefa: card.querySelector('.card-body'),
    cabecalho: card.querySelector('.d-flex.justify-content-between.align-items-center.mb-2'),
    badge: card.querySelector('.badge'),
    divBotoes: card.querySelector('.d-flex.justify-content-between.align-items-center:last-child'),
    divBotoesEditApaga: card.querySelector('.d-flex.gap-2'),
    botaoMais: card.querySelector('button[title="Ver Mais"]'),
    iconeBotaoMais: card.querySelector('button[title="Ver Mais"] i'),

    botaoEdit: card.querySelector('button[title="Editar"]'),
    iconeBotaoEdit: card.querySelector('button[title="Editar"] i'),

    botaoApaga: card.querySelector('button[title="Apagar"]'),
    iconeBotaoApaga: card.querySelector('button[title="Apagar"] i'),
    descricao: card.querySelector('.descricao'),
    dataCriacao: card.querySelectorAll('.dataCriacao')[0],
    titulo: card.querySelector('.card-title'),
    data: card.querySelector('time'),
    prioridade: card.querySelector('.progress-bar p'),
    notificacao: card.querySelector('.notificacao'),
  };
}

function salvarTarefaNoLocalStorage(novaTarefa) {
        const dadosTarefa = extrairDadosDaTarefa(novaTarefa);
        let tarefas = [];

    try {
        const dados = JSON.parse(localStorage.getItem('tarefas'));
        if (Array.isArray(dados)) {
            tarefas = dados;
        }
    } catch (e) {
        console.warn('Erro ao ler tarefas salvas:', e);
    }

    tarefas.push(dadosTarefa);
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function carregarTarefasSalvas() {
    const colunaAfazer = document.getElementById('colunaAfazer');
    colunaAfazer.innerHTML = '';

    const tarefasSalvas = JSON.parse(localStorage.getItem('tarefas')) || [];

    if (Array.isArray(tarefasSalvas) && tarefasSalvas.length > 0) {
        tarefasSalvas.forEach((tarefa, index) => {
            const card = criarCardTarefa(tarefa, index);
            estilizarCardTarefa(card);
            adicionarTarefa(card);
        });
    } else {
        console.warn('Nenhuma tarefa salva ou dado corrompido.');
    }
}

function removerTarefaDoLocalStorage(id) {
    const tarefasSalvas = JSON.parse(localStorage.getItem('tarefas')) || [];

    const tarefasAtualizadas = tarefasSalvas.filter(tarefa => tarefa.id !== id);
    localStorage.setItem('tarefas', JSON.stringify(tarefasAtualizadas));
}