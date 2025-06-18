import express from "express";
import { clearProjectMessages, getMessages, newMessage } from "../controllers/MessageController.js";

const messageRouter = express.Router();

messageRouter.post("/new", newMessage);
messageRouter.post("/get", getMessages);
messageRouter.post("/clear", clearProjectMessages);

export default messageRouter;

