// src/app.js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Bem-vindo');
});

app.get('/status', (req, res) => {
  res.json({ status: 'ok' });
});

module.exports = app;