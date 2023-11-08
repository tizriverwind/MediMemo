import express from "express";
import {
  deletePatientCon,
  getPatientsCon,
  postPatientsCon,
  putPatientsCon,
} from "../controllers/patientRecordRouteController.js";

const router = express.Router();

router
  .route("/")
  .get(getPatientsCon)
  .post(postPatientsCon)
  .put(putPatientsCon)
  .delete(deletePatientCon);

export default router;
