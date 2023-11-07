import express from "express";
import { postUsersCon } from "../controllers/userRouteController.js";

const router = express.Router();

router.route("/").post(postUsersCon);

export default router;
