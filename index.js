// Importar as dependências
const express = require('express');
const { Client } = require('@notionhq/client');

const dotenv = require('dotenv').config();


// Configurar o cliente do Notion
const notion = new Client({
  auth: process.env.NOTION_API_KEY
});

// Configurar o Express
const app = express();
const PORT = 3001;

// Definir rota para obter todos os itens de uma base de dados do Notion
app.get('/api/notion/items', async (req, res) => {
  try {
    // Use o cliente do Notion para fazer uma solicitação à API do Notion
    const response = await notion.databases.query({
      database_id: '5902115bf1e44a27b3fa57e43a78d316'
    });

    // Retorne os itens como resposta da API
    res.json(response.results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao obter itens do Notion' });
  }
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor Express rodando na porta ${PORT}`);
});
