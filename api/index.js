const mysql = require("mysql2/promise");

module.exports = async (req, res) => {
    const db = await mysql.createConnection({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        port: process.env.PORT
    });

    if (req.method === "GET" && req.url === "/opcoes") {
        const [rows] = await db.query("SELECT id, opcao_nome AS nome FROM tbl_votos");
        return res.status(200).json(rows);
    }

    if (req.method === "POST" && req.url === "/votar") {
        let body = "";
        req.on("data", chunk => body += chunk);
        req.on("end", async () => {
            const data = JSON.parse(body);
            await db.query(
                "UPDATE tbl_votos SET total_votos = total_votos + 1 WHERE id = ?",
                [data.id]
            );
            return res.status(200).json({ sucesso: true });
        });
        return;
    }

    if (req.method === "GET" && req.url === "/resultados") {
        const [rows] = await db.query("SELECT opcao_nome AS nome, total_votos AS votos FROM tbl_votos");
        return res.status(200).json(rows);
    }

    return res.status(404).json({ error: "Rota não encontrada" });
};
