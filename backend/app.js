const express = require('express');
const cors = require('cors');
const connection = require('./db');

const server = express();
server.use(cors());
server.use(express.json());

server.get('/produtos', (req, res) => {
    const sql = 'SELECT * FROM PRODUTO';

    connection.query(sql, (erro, resultado) => {
        if(erro){
            return res.status(500).json({erro: erro.message });
        }
        return res.json(resultado);
    })
})

server.get('/produtos/ordenados', (req, res) => {
    const sql = 'SELECT * FROM PRODUTO ORDER BY NOME ASC';

    connection.query(sql, (erro, resultado) => {
        if(erro){
            return res.status(500).json({erro: erro.message });
        }
        return res.json(resultado);
    })
})

const PORT = 3099;

server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
})