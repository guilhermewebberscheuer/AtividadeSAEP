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

server.get('/produtos/:id', (req, res) => {
    const { id } = req.params;

    const sql = 'select *from PRODUTO where id_produto = ?';

    connection.query(sql, [id], (erro, resultado) => {
        if(erro){
            return res.status(500).json({erro: erro.message });
        }
        return res.json(resultado[0]);
    })
})

server.get('/produtos/busca/:nome', (req, res) => {
    const sql = 'SELECT * FROM PRODUTO WHERE nome LIKE ?';

    const termoBusca = '%' + req.params.nome + '%';

    connection.query(sql, [termoBusca], (erro, resultado) => {
        if(erro){
            return res.status(500).json({erro: erro.message });
        }
        return res.json(resultado);
    });
});

server.post('/produtos', (req, res) => {
    const{ nome, cor, textura, peso, unidade_medida, 
        aplicacao, data_validade, estoque_minimo, estoque_atual, 
        preco_unitario, id_categoria 
    } = req.body;

    if (nome == null || cor == null || textura == null || peso == null || unidade_medida == null || aplicacao == null || data_validade == null || estoque_minimo == null || estoque_atual == null || preco_unitario == null || id_categoria == null) {
        return res.status(400).json({erro: 'Todos os campos são obrigatórios'});
    }

    const sql = 'INSERT INTO PRODUTO (nome, cor, textura, peso, unidade_medida, aplicacao, data_validade, estoque_minimo, estoque_atual, preco_unitario, id_categoria) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

    connection.query(sql, [nome, cor, textura, peso, unidade_medida, aplicacao, data_validade, estoque_minimo, estoque_atual, preco_unitario, id_categoria], (erro, resultado) => {
        if(erro){
            return res.status(500).json({erro: erro.message });
        }
        return res.status(201).json({mensagem: 'Produto cadastrado com sucesso', id: resultado.insertId});
    });
});

server.put('/produtos/:id', (req, res) => {
    const{ nome, cor, textura, peso, unidade_medida, 
        aplicacao, data_validade, estoque_minimo, estoque_atual, 
        preco_unitario, id_categoria 
    } = req.body;

    const {id} = req.params;

    const sql = `UPDATE PRODUTO SET nome = ?, cor = ?, textura = ?, peso = ?, unidade_medida = ?, aplicacao = ?, data_validade = ?, estoque_minimo = ?, estoque_atual = ?, preco_unitario = ?, id_categoria = ? WHERE id_produto = ?`;

    connection.query(sql, [nome, cor, textura, peso, unidade_medida, aplicacao, data_validade, estoque_minimo, estoque_atual, preco_unitario, id_categoria, id], (erro, resultado) => {
        if(erro){
            return res.status(500).json({erro: erro.message });
        }})
        res.json({mensagem: 'Produto atualizado com sucesso'});
})

const PORT = 3099;

server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
})