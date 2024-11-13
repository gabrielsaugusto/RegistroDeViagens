const express = require('express');
const rotas = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/diario.db');

//Rota para obter todas as viagens
rotas.get('/viagens', (req, res) => {
  db.all('SELECT * FROM viagens', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ data: rows });
  });
});

//Rota para obter uma viagem /:id
rotas.get('/viagens/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM viagens WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ data: row });
  });
});

//Rota para adicionar uma nova viagem
rotas.post('/viagens', (req, res) => {
  const { destino, descricao, data, avaliacao } = req.body;
  db.run('INSERT INTO viagens (destino, descricao, data, avaliacao) VALUES (?, ?, ?, ?)', [destino, descricao, data, avaliacao], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID });
  });
});

//Rota para atualizar uma viagem
rotas.put('/viagens/:id', (req, res) => {
  const { id } = req.params;
  const { destino, descricao, data, avaliacao } = req.body;
  db.run('UPDATE viagens SET destino = ?, descricao = ?, data = ?, avaliacao = ? WHERE id = ?', [destino, descricao, data, avaliacao, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Viagem atualizada com sucesso!' });
  });
});

// Rota para excluir uma viagem
rotas.delete('/viagens/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM viagens WHERE id = ?', id, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Viagem deletada com sucesso!' });
  });
});

module.exports = rotas;
