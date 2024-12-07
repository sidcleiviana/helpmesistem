import React, { useState } from 'react';
import axios from 'axios'; // Para enviar dados à API

function Register() {
  const [nome, setNome] = useState(''); // Nome do usuário
  const [senha, setSenha] = useState(''); // Senha do usuário
  const [email, setEmail] = useState(''); // E-mail do usuário
  const [tipo_usuario, setTipoUsuario] = useState('comum'); // Tipo do usuário (comum, admin, etc.)
  const [error, setError] = useState(''); // Mensagem de erro
  const [success, setSuccess] = useState(''); // Mensagem de sucesso

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:8000/api/usuarios/register', {
        nome, 
        senha, 
        email, 
        tipo_usuario
      });
  
      if (response.data.status === 'Usuário criado com sucesso') {
        setSuccess('Usuário criado com sucesso!');
        setError('');
      } else {
        setError('Erro ao criar o usuário!');
        setSuccess('');
      }
    } catch (error) {
      console.error(error);  // Para exibir detalhes completos no console
  
      // Melhorando a captura de erro para identificar a origem
      if (error.response) {
        // Erro vindo da resposta da API
        setError(`Erro da API: ${error.response.data.detail || error.response.data}`);
      } else if (error.request) {
        // Erro na requisição (ex: servidor não responde)
        setError('Erro ao comunicar com o servidor! Não foi possível acessar a API.');
      } else {
        // Outro erro desconhecido
        setError(`Erro desconhecido: ${error.message}`);
      }
  
      setSuccess('');
    }
  };
  
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #0066cc, #33cc33)',
        color: 'white',
        flexDirection: 'column',
      }}
    >
      <h1 style={{ fontSize: '2.5rem', marginBottom: '30px' }}>Help me Tasy - Cadastro</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '10px',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
          width: '100%',
          maxWidth: '400px',
          textAlign: 'center',
        }}
      >
        <div style={{ marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            style={{
              width: '95%',
              padding: '15px',
              fontSize: '1rem',
              border: '1px solid #ccc',
              borderRadius: '5px',
              marginBottom: '15px',
              outline: 'none',
            }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: '95%',
              padding: '15px',
              fontSize: '1rem',
              border: '1px solid #ccc',
              borderRadius: '5px',
              marginBottom: '15px',
              outline: 'none',
            }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            style={{
              width: '95%',
              padding: '15px',
              fontSize: '1rem',
              border: '1px solid #ccc',
              borderRadius: '5px',
              marginBottom: '20px',
              outline: 'none',
            }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Tipo de usuário"
            value={tipo_usuario}
            onChange={(e) => setTipoUsuario(e.target.value)}
            style={{
              width: '95%',
              padding: '15px',
              fontSize: '1rem',
              border: '1px solid #ccc',
              borderRadius: '5px',
              marginBottom: '20px',
              outline: 'none',
            }}
          />
        </div>

        {/* Exibir mensagens de erro ou sucesso */}
        {error && (
          <div
            style={{
              color: 'red',
              fontSize: '1rem',
              marginBottom: '20px',
            }}
          >
            {error}
          </div>
        )}

        {success && (
          <div
            style={{
              color: 'green',
              fontSize: '1rem',
              marginBottom: '20px',
            }}
          >
            {success}
          </div>
        )}

        <button
          type="submit"
          style={{
            width: '95%',
            padding: '15px',
            fontSize: '1.2rem',
            backgroundColor: '#33cc33',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
          }}
        >
          Criar Conta
        </button>
      </form>
    </div>
  );
}

export default Register;
