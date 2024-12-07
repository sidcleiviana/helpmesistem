// src/pages/Users.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Aqui fazemos a requisição para obter a lista de usuários
    axios.get('/api/usuarios')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Erro ao obter usuários:', error);
      });
  }, []);

  return (
    <div
      style={{
        padding: '2rem',
        background: '#f4f4f4',
        minHeight: '100vh',
      }}
    >
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Usuários Cadastrados</h1>

      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          borderRadius: '10px',
          overflow: 'hidden',
        }}
      >
        <thead>
          <tr>
            <th style={{ padding: '1rem', textAlign: 'left', backgroundColor: '#33cc33', color: 'white' }}>ID</th>
            <th style={{ padding: '1rem', textAlign: 'left', backgroundColor: '#33cc33', color: 'white' }}>Nome de Usuário</th>
            <th style={{ padding: '1rem', textAlign: 'left', backgroundColor: '#33cc33', color: 'white' }}>Email</th>
            <th style={{ padding: '1rem', textAlign: 'left', backgroundColor: '#33cc33', color: 'white' }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #ddd' }}>{user.id}</td>
              <td style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #ddd' }}>{user.username}</td>
              <td style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #ddd' }}>{user.email}</td>
              <td style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #ddd' }}>
                <button
                  style={{
                    backgroundColor: '#ff5733',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                  onClick={() => alert('Função de editar ou excluir aqui')}
                >
                  Editar / Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
