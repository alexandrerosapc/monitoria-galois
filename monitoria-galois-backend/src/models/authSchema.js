import joi from 'joi'

export const alunoSchema = joi.object({
  matricula: joi.string().required()
});

// Novo schema para validar os dados de registro da monitoria
export const registrationSchema = joi.object({
  // Dados que esperamos receber do frontend
  matricula: joi.string().required(),
  studentId: joi.number().integer().positive().required(),
  studentName: joi.string().required(),
  studentGrade: joi.string().allow(null, '').optional(), // Permitir nulo ou vazio, opcional
  studentClass: joi.string().allow(null, '').optional(), // Permitir nulo ou vazio, opcional
  monitoria: joi.string().required(),
  registrationTime: joi.date().iso().required() // Espera uma data no formato ISO 8601
});