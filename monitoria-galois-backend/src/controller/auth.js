import { db } from "../config/database.js";

export async function checkIn(req, res) {
  // Usamos "matricula" para ser consistente com o schema e o front-end
  const { matricula } = req.body;

  try {
    const checkAluno = await db.query(
      "SELECT * FROM alunos WHERE matricula_aluno = $1;",
      [matricula]
    );
    // Se nenhum aluno for encontrado, pode retornar um status 404
    if (checkAluno.rowCount === 0) {
      return res.status(404).send({ message: "Matrícula não encontrada." });
    }
    res.send(checkAluno.rows[0]);
  } catch (error) {
    console.error("Erro ao consultar o aluno:", error);
    res.status(500).send("Erro ao buscar a matrícula no banco de dados.");
  }
}
