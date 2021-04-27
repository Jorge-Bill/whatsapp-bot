import { Router } from "express";
import MessageController from "../controllers/MessageController";

const MsgRouter = Router();

MsgRouter.post("/message", MessageController.sendMessage);

export default MsgRouter;
