const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());

// Servir arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, "public")));

// Conexão com MySQL
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Pereira2525!",
    database: "enquete_db"
});

// Testar conexão
db.connect((err) => {
    if (err) {
        console.error("Erro ao conectar no MySQL:", err);
        return;
    }
    console.log("MySQL conectado!");
});

// ROTA 1 → Buscar opções
app.get("/opcoes", (req, res) => {
    db.query("SELECT id, opcao_nome AS nome FROM tbl_votos", (err, result) => {
        if (err) return res.status(500).send(err);
        res.send(result);
    });
});


// ROTA 2 → Registrar voto
app.post("/votar", (req, res) => {
    const id = req.body.id;

    db.query(
        "UPDATE tbl_votos SET total_votos = total_votos + 1 WHERE id = ?",
        [id],
        (err) => {
            if (err) return res.status(500).send(err);
            res.send({ sucesso: true });
        }
    );
});


// ROTA 3 → Buscar resultados
app.get("/resultados", (req, res) => {
    db.query("SELECT opcao_nome AS nome, total_votos AS votos FROM tbl_votos", (err, result) => {
        if (err) return res.status(500).send(err);
        res.send(result);
    });
});


app.listen(4000, () => {
    console.log("Servidor rodando em http://localhost:4000");
});
