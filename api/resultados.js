import { db } from "./db.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const [rows] = await db.query("SELECT opcao_nome AS nome, total_votos AS votos FROM tbl_votos");
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
