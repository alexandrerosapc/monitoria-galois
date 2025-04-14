import { Router } from "express";
import { alunoSchema, registrationSchema } from "../models/authSchema.js";
import { checkIn, registerMonitoria } from "../controller/auth.js";
import { validateSchema } from "../middleware/validateSchema.js";

const authRouter = Router();

authRouter.post("/validar-matricula", validateSchema(alunoSchema), checkIn);

authRouter.post("/register-monitoria", validateSchema(registrationSchema), registerMonitoria);

export default authRouter;
