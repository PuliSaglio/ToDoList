document.addEventListener('DOMContentLoaded' , function(){
    const form = document.getElementById('formNovaTarefa');

    form.addEventListener('submit', function(event){
        event.preventDefault();
        adicionarTarefa();
        modal.classList.add('d-none');
    });
});

const btnAbrirModal = document.getElementById('btnAbrirModal');
const btnFecharModal = document.getElementById('btnFecharModal');
const modal = document.getElementById('modalTarefa');

btnAbrirModal.onclick = () => modal.classList.remove('d-none');
btnFecharModal.onclick = () => modal.classList.add('d-none');


function adicionarTarefa(){

    const colunaTodo = document.getElementById('colunaAfazer');
    const cardSombreado = document.createElement('div');
    cardSombreado.className = "card shadow-sm mb-3";
    const novaTarefa = document.createElement('div');
    novaTarefa.className = "card-body";
    const cabecalhoCard = document.createElement('div');
    cabecalhoCard.className = "d-flex justify-content-between align-items-center mb-2";
    const badge = document.createElement('span');
    badge.className = "badge bg-primary";

    const tituloTarefa = document.createElement('h5');
    tituloTarefa.innerHTML = document.getElementById('tituloTarefa').value;
    tituloTarefa.className = "card-title mb-0";
    const descricaoTarefa = document.createElement('p');
    descricaoTarefa.className = "card-text ms-2 mb-2";
    descricaoTarefa.innerHTML = document.getElementById('descricaoTarefa').value;
    const dataTarefa = document.createElement('time');
    dataTarefa.dateTime = document.getElementById('dataTarefa').value;
    dataTarefa.innerHTML = document.getElementById('dataTarefa').value;

    const prioridadeTarefa = document.createElement('p');
    prioridadeTarefa.innerHTML = document.getElementById('prioridadeTarefa').value;
    prioridadeTarefa.className = "fw-bold text-danger mb-0";
    const notificacaoTarefa = document.createElement('p');
    notificacaoTarefa.innerHTML = document.querySelector('input[name="notificacao"]:checked').value;

    const dataCriacao = new Date();

    console.log(dataCriacao);
    badge.appendChild(dataTarefa)
    novaTarefa.appendChild(cabecalhoCard);
    cabecalhoCard.appendChild(tituloTarefa);
    cabecalhoCard.appendChild(badge);
    novaTarefa.appendChild(descricaoTarefa);
    novaTarefa.appendChild(prioridadeTarefa);

    colunaTodo.appendChild(cardSombreado);
    cardSombreado.appendChild(novaTarefa);
    
}