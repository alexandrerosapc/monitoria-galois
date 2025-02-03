import joi from 'joi'

export const alunoSchema = joi.object({
  matricula: joi.string().required()
});