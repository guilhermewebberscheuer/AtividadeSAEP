const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'saep_db'
});

connection.connect((erro) => {
    if(erro){
        console.log('Erro ao conectar ao Banco de Dados: ', erro)
        return;
    }
    console.log('Banco de Dados saep_db foi conectado com sucesso.')
});

module.exports = connection;