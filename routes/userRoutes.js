import express from "express";
import {
  authenticateAccountCon,
  postUsersCon,
} from "../controllers/userRouteController.js";

const router = express.Router();

router.route("/").post(postUsersCon).get(authenticateAccountCon);

export default router;
