const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const PORT = 3035;

const API_URL = "http://187.127.31.203:8080";
const API_KEY = "vml2026";

app.use(express.static(__dirname));

// Rota para o painel
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Proxy para Status
app.get('/api/status/:inst', async (req, res) => {
    try {
        const response = await axios.get(`${API_URL}/instance/connectionState/${req.params.inst}`, {
            headers: { 'apikey': API_KEY }
        });
        res.json(response.data);
    } catch (e) { res.status(500).json({ error: e.message }); }
});

// Proxy para Conexão
app.get('/api/connect/:inst', async (req, res) => {
    try {
        const response = await axios.get(`${API_URL}/instance/connect/${req.params.inst}`, {
            headers: { 'apikey': API_KEY }
        });
        res.json(response.data);
    } catch (e) { res.status(500).json({ error: e.message }); }
});

app.listen(PORT, '0.0.0.0', () => console.log('Servidor Proxy rodando na porta 3035'));