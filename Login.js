import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Importar axios para fazer a requisição à API

function Login() {
  const [email, setEmail] = useState('');  // Mudança de username para email
  const [senha, setSenha] = useState('');  // Mudança de password para senha
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Envia 'email' e 'senha' para o backend
      const response = await axios.post('http://localhost:8000/api/usuarios/login', { email, senha });

      // Se login for bem-sucedido
      if (response.data.message === 'Login bem-sucedido') {
        navigate('/dashboard'); // Redireciona para o Dashboard
      } else {
        setError('Credenciais inválidas');
      }
    } catch (error) {
      setError('Erro ao autenticar o usuário');
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
      <h1 style={{ fontSize: '2.5rem', marginBottom: '30px', animation: 'fadeIn 1s' }}>
        Sistema Help-me Tasy - Login
      </h1>

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
            type="email"  // Campo para email
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: '100%',
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
              width: '100%',
              padding: '15px',
              fontSize: '1rem',
              border: '1px solid #ccc',
              borderRadius: '5px',
              marginBottom: '20px',
              outline: 'none',
            }}
          />
        </div>

        {error && (
          <div
            style={{
              color: 'red',
              fontSize: '1rem',
              marginBottom: '20px',
              animation: 'fadeIn 1s',
            }}
          >
            {error}
          </div>
        )}

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '15px',
            fontSize: '1.2rem',
            backgroundColor: '#33cc33',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = '#28a428')}
          onMouseLeave={(e) => (e.target.style.backgroundColor = '#33cc33')}
        >
          Entrar
        </button>

        {/* Botão para navegar para a página de registro */}
        <div style={{ marginTop: '20px' }}>
          <button
            type="button"
            onClick={() => navigate('/register')}
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '1rem',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              marginTop: '10px',
              transition: 'background-color 0.3s',
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#0056b3')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#007bff')}
          >
            Criar uma conta
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
