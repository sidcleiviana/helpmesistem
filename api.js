import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/';

// Função para criar uma nova tarefa recente
export const createTarefaRecente = (usuarioId, titulo, descricao, status, prioridade) => {
  return axios.post(`${API_URL}tarefas_recentes/`, {
    usuario_id: usuarioId,
    titulo,
    descricao,
    status,
    prioridade,
  });
};

// Função para obter tarefas recentes de um usuário
export const getTarefasRecentes = (usuarioId) => {
  return axios.get(`${API_URL}tarefas_recentes/${usuarioId}`);
};

// Função para obter todos os cursos
export const getCursos = () => {
  return axios.get(`${API_URL}cursos/`);
};

// Função para criar um novo curso
export const createCurso = (nome, descricao, categoria, duracao, data_inicio, data_fim, preco, nivel) => {
  return axios.post(`${API_URL}cursos/`, {
    nome,
    descricao,
    categoria,
    duracao,
    data_inicio,
    data_fim,
    preco,
    nivel
  });
};

// Função para obter todas as atividades de quiz
export const getAtividadesQuiz = (cursoId) => {
  return axios.get(`${API_URL}atividades_quiz/${cursoId}`);
};

// Função para criar uma nova atividade de quiz
export const createAtividadeQuiz = (cursoId, titulo, descricao, quantidade_questoes, pontuacao_maxima, tempo_limite) => {
  return axios.post(`${API_URL}atividades_quiz/`, {
    curso_id: cursoId,
    titulo,
    descricao,
    quantidade_questoes,
    pontuacao_maxima,
    tempo_limite
  });
};

// -------------------------- Funções relacionadas a usuários --------------------------

// Função para criar um novo usuário
export const createUser = (nome, email, senha) => {
  return axios.post(`${API_URL}usuarios/`, {
    nome,    // Alterado de 'username' para 'nome'
    email,
    senha    // Alterado de 'password' para 'senha'
  });
};

// Função para obter todos os usuários
export const getUsers = () => {
  return axios.get(`${API_URL}usuarios/`);
};

// Função para obter um usuário específico pelo ID
export const getUserById = (userId) => {
  return axios.get(`${API_URL}usuarios/${userId}`);
};

// Função para atualizar um usuário
export const updateUser = (userId, nome, email, senha) => {
  return axios.put(`${API_URL}usuarios/${userId}/`, {
    nome,    // Alterado de 'username' para 'nome'
    email,
    senha    // Alterado de 'password' para 'senha'
  });
};

// Função para excluir um usuário
export const deleteUser = (userId) => {
  return axios.delete(`${API_URL}usuarios/${userId}/`);
};

// -------------------------- Funções relacionadas a feedbacks --------------------------

// Função para obter feedbacks
export const getFeedbacks = () => {
  return axios.get(`${API_URL}feedbacks/`);
};

// Função para criar um novo feedback
export const createFeedback = (userId, mensagem) => {
  return axios.post(`${API_URL}feedbacks/`, {
    usuario_id: userId,
    mensagem,
  });
};

// -------------------------- Funções de autenticação --------------------------

// Função para login de usuário
export const login = (email, senha) => {
  return axios.post(`${API_URL}auth/login/`, {
    email,
    senha    // Alterado de 'password' para 'senha'
  });
};

// Função para registrar um novo usuário
export const register = (nome, email, senha) => {
  return axios.post(`${API_URL}auth/register/`, {
    nome,    // Alterado de 'username' para 'nome'
    email,
    senha    // Alterado de 'password' para 'senha'
  });
};

// Função para logoff (sair)
export const logout = () => {
  return axios.post(`${API_URL}auth/logout/`);
};
