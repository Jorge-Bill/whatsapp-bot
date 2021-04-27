import { Router } from "express";
import botRouter from "./search";
import jokenpoRouter from "./jokenpo";
import fileRouter from "./file";
import MsgRouter from "./messages";
import AprovaRouter from "./aprovaFacil";

const v1Router = Router();
v1Router.use("/api/v1/", botRouter, jokenpoRouter, fileRouter, MsgRouter, AprovaRouter);

v1Router.get("/", (req, res) => {
  res.send("api de busca com bot do whatsapp");
});

export default v1Router;
