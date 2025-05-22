function voltar() {
    window.location.href = 'todo.html';
}

function desformataData(dataStr) {
    const [dia, mes, ano] = dataStr.split('/');
    return `${ano}-${mes}-${dia}`;
}

document.addEventListener('DOMContentLoaded', () => {
    const tarefa = JSON.parse(localStorage.getItem('tarefaSelecionada'));

    if (!tarefa) {
        alert('Nenhuma tarefa encontrada.');
        window.location.href = 'index.html';
        return;
    }

    document.getElementById('id').textContent = tarefa.id;
    document.getElementById('titulo').textContent = tarefa.titulo;
    document.getElementById('descricao').textContent = tarefa.descricao;
    document.getElementById('data').textContent = tarefa.data;
    document.getElementById('dataCriacao').textContent = tarefa.dataCriacao;
    document.getElementById('notificacao').textContent = tarefa.notificacao;
    document.getElementById('prioridade').textContent = tarefa.prioridade;

    const hoje = new Date();
    const dataTarefa = new Date(desformataData(tarefa.data));
    
    const status = dataTarefa < hoje ? 'Atrasada' : 'Dentro do prazo';
    document.getElementById('status').textContent = status;
});
