import React, { useState, useEffect } from 'react';
import { getCursos, createCurso } from '../services/api';

function Cursos() {
  const [cursos, setCursos] = useState([]);
  const [newCurso, setNewCurso] = useState({
    nome: '',
    descricao: '',
    categoria: '',
    duracao: '',
    data_inicio: '',
    data_fim: '',
    preco: '',
    nivel: ''
  });

  useEffect(() => {
    getCursos().then(response => {
      setCursos(response.data);
    }).catch(error => {
      console.error("Erro ao carregar cursos:", error);
    });
  }, []);

  const handleCreateCurso = () => {
    createCurso(newCurso.nome, newCurso.descricao, newCurso.categoria, newCurso.duracao, newCurso.data_inicio, newCurso.data_fim, newCurso.preco, newCurso.nivel)
      .then(response => {
        setCursos([...cursos, response.data]);
        setNewCurso({ nome: '', descricao: '', categoria: '', duracao: '', data_inicio: '', data_fim: '', preco: '', nivel: '' });
      }).catch(error => {
        console.error("Erro ao criar curso:", error);
      });
  };

  return (
    <div>
      <h1>Cursos</h1>

      {/* Formulário para criar um novo curso */}
      <div>
        <input
          type="text"
          placeholder="Nome do Curso"
          value={newCurso.nome}
          onChange={(e) => setNewCurso({ ...newCurso, nome: e.target.value })}
        />
        {/* Adicione outros campos conforme necessário */}
        <button onClick={handleCreateCurso}>Criar Curso</button>
      </div>

      {/* Lista de cursos */}
      <ul>
        {cursos.map((curso) => (
          <li key={curso.id}>{curso.nome} - {curso.nivel}</li>
        ))}
      </ul>
    </div>
  );
}

export default Cursos;
