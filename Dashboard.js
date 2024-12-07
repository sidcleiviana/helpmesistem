import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Aqui você pode fazer uma requisição para obter o usuário logado
    axios.get('http://127.0.0.1:8000/users')
      .then(response => {
        // Supondo que você tenha a lista de usuários e pegue um usuário específico
        const loggedInUser = response.data.find(user => user.username === 'joao'); // Exemplo
        setUser(loggedInUser);
      })
      .catch(error => {
        console.error('Erro ao buscar dados dos usuários:', error);
      });
  }, []);

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #0066cc, #33cc33)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        padding: '20px',
      }}
    >
      <h1
        style={{
          fontSize: '3rem',
          marginBottom: '20px',
        }}
      >
        Bem-vindo ao Sistema Tasy
      </h1>

      {user ? (
        <>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '30px',
            }}
          >
            <img
              src={user.avatar}
              alt="Avatar"
              style={{
                borderRadius: '50%',
                width: '50px',
                height: '50px',
                marginRight: '15px',
              }}
            />
            <h2 style={{ fontSize: '2rem' }}>Olá, {user.name}!</h2>
          </div>
          <p
            style={{
              fontSize: '1.5rem',
              marginBottom: '30px',
            }}
          >
            Escolha uma das opções abaixo para acessar as funções do sistema.
          </p>
        </>
      ) : (
        <p>Carregando usuário...</p>
      )}

      {/* Restante do conteúdo */}
    </div>
  );
}

export default Dashboard;
