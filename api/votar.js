import { db } from "./db.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { id } = req.body;
  if (!id) return res.status(400).json({ error: "ID não enviado" });

  try {
    await db.query("UPDATE tbl_votos SET total_votos = total_votos + 1 WHERE id = ?", [id]);
    res.status(200).json({ sucesso: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
