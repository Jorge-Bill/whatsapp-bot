import { Router } from "express";
import AprovaFacil from "../controllers/AprovaFacil";

const AprovaRouter = Router();

AprovaRouter.post("/aprova-facil", AprovaFacil.flowManager);

export default AprovaRouter;
