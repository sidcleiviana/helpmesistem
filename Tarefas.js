import React, { useState, useEffect } from 'react';
import { getTarefasRecentes, createTarefaRecente } from '../services/api'; // Funções de API

function Tarefas() {
  const [tarefas, setTarefas] = useState([]);
  const [newTarefa, setNewTarefa] = useState({
    titulo: '',
    descricao: '',
    status: 'Pendente',
    prioridade: 'Normal'
  });

  const usuarioId = 1; // ID do usuário logado (defina dinamicamente conforme necessário)

  useEffect(() => {
    // Carregar tarefas recentes
    getTarefasRecentes(usuarioId).then(response => {
      setTarefas(response.data);
    }).catch(error => {
      console.error("Erro ao carregar tarefas recentes:", error);
    });
  }, [usuarioId]);

  const handleCreateTarefa = () => {
    createTarefaRecente(usuarioId, newTarefa.titulo, newTarefa.descricao, newTarefa.status, newTarefa.prioridade)
      .then(response => {
        setTarefas([...tarefas, response.data]); // Adiciona a nova tarefa na lista
        setNewTarefa({ titulo: '', descricao: '', status: 'Pendente', prioridade: 'Normal' });
      }).catch(error => {
        console.error("Erro ao criar tarefa:", error);
      });
  };

  return (
    <div>
      <h1>Tarefas Recentes</h1>

      {/* Formulário para criar uma nova tarefa */}
      <div>
        <input
          type="text"
          placeholder="Título"
          value={newTarefa.titulo}
          onChange={(e) => setNewTarefa({ ...newTarefa, titulo: e.target.value })}
        />
        <textarea
          placeholder="Descrição"
          value={newTarefa.descricao}
          onChange={(e) => setNewTarefa({ ...newTarefa, descricao: e.target.value })}
        />
        <button onClick={handleCreateTarefa}>Criar Tarefa</button>
      </div>

      {/* Lista de tarefas recentes */}
      <ul>
        {tarefas.map((tarefa) => (
          <li key={tarefa.id}>
            <strong>{tarefa.titulo}</strong> - {tarefa.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tarefas;
