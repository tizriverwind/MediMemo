import express from "express";
let router = express.Router();

import myDB from "../db/myMongoDB.js";
/* GET home page. */
router.get("/api/apointments", async function (req, res, next) {
  // Send a response without rendering a view
  //res.send("Welcome to MediMemo!");

  const appointments = await myDB.getAppointments();
  res.json(appointments);
});

export default router;
