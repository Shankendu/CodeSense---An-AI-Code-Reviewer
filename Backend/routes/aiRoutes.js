import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { aiController } from "../controllers/aiController.js";

const aiRouter = express.Router();

aiRouter.post("/review-code", isAuth, aiController )

export default aiRouter;