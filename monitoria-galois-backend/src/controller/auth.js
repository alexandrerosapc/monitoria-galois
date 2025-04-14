import { db } from "../config/database.js";

export async function checkIn(req, res) {
  // Usamos "matricula" para ser consistente com o schema e o front-end
  const { matricula } = req.body;

  try {
    // Selecionar explicitamente as colunas esperadas pelo frontend
    // Assumindo que os nomes das colunas no BD são id, nome_aluno, serie_aluno, turma_aluno
    const queryText = `
      SELECT id, nome_aluno, serie_aluno, turma_aluno
      FROM alunos
      WHERE matricula_aluno = $1;
    `;
    const checkAluno = await db.query(queryText, [matricula]);

    // Se nenhum aluno for encontrado, pode retornar um status 404
    if (checkAluno.rowCount === 0) {
      return res.status(404).send({ message: "Matrícula não encontrada." });
    }
    // Retorna os dados do aluno encontrados
    res.send(checkAluno.rows[0]);
  } catch (error) {
    console.error("Erro ao consultar o aluno:", error);
    res.status(500).send("Erro ao buscar a matrícula no banco de dados.");
  }
}

// Função para registrar a monitoria, com verificação por aluno, monitoria e dia
export async function registerMonitoria(req, res) {
  const { studentId, studentName, matricula, studentGrade, studentClass, monitoria, registrationTime } = req.body;

  try {
    // 1. Verificar se o aluno já está registrado nesta monitoria específica HOJE
    // Comparamos o aluno_id, a monitoria_selecionada e a DATA (ignorando a hora)
    const checkExistingRegistrationQuery = `
      SELECT id
      FROM registros_monitoria
      WHERE aluno_id = $1
        AND monitoria_selecionada = $2
        AND DATE(data_registro) = DATE($3); -- Compara apenas a data
    `;
    // Os parâmetros são: ID do aluno, nome da monitoria, timestamp da tentativa de registro
    const existingResult = await db.query(checkExistingRegistrationQuery, [studentId, monitoria, registrationTime]);

    // Se já existe um registro para este aluno, nesta monitoria, neste dia
    if (existingResult.rowCount > 0) {
      return res.status(409).send({ message: `Este aluno já está registrado na monitoria de ${monitoria} hoje.` });
    }

    // 2. Se não houver registro duplicado hoje, prosseguir com a inserção
    const insertQuery = `
      INSERT INTO registros_monitoria (
        aluno_id, nome_aluno, matricula_aluno, serie_aluno, turma_aluno, monitoria_selecionada, data_registro
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id;
    `;
    const values = [
      studentId,
      studentName,
      matricula,
      studentGrade,
      studentClass,
      monitoria,
      registrationTime // Usamos o timestamp completo para a inserção
    ];

    const result = await db.query(insertQuery, values);

    res.status(201).send({ message: "Monitoria registrada com sucesso!", registrationId: result.rows[0].id });

  } catch (error) {
    console.error("Erro ao registrar monitoria:", error);
    if (error.code === '23503') { // Erro de chave estrangeira
        return res.status(400).send({ message: "Erro: ID do aluno inválido ou não encontrado." });
    }
    // Tratamento de erro caso a conversão de data falhe (improvável com ISO string)
    if (error.code === '22007' || error.code === '22008') { // Códigos de erro relacionados a formato/valor de data/hora inválido
        console.error("Erro de formato de data/hora:", error)
        return res.status(400).send({ message: "Erro: Formato de data/hora inválido." });
    }
    // Outro erro genérico do servidor
    res.status(500).send({ message: "Erro ao salvar o registro da monitoria no banco de dados." });
  }
}
