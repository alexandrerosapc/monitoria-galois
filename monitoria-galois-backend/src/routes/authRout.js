import { Router } from "express";
import { alunoSchema } from "../models/authSchema.js";
import { checkIn } from "../controller/auth.js";
import { validateSchema } from "../middleware/validateSchema.js";

const authRouter = Router();

authRouter.post("/validar-matricula", validateSchema(alunoSchema), checkIn);

export default authRouter;
