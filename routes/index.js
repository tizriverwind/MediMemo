// import express from "express";
// let router = express.Router();

// import myDB from "../db/myMongoDB.js";
// /* GET home page. */
// router.get("/api/apointments", async function (req, res, next) {
//   // Send a response without rendering a view
//   //res.send("Welcome to MediMemo!");

//   const appointments = await myDB.getAppointments();
//   res.json(appointments);
// });

// export default router;

import express from "express";
import myDB from "../db/myMongoDB.js";

const router = express.Router();

router.get("/api/appointments", async (req, res) => {
  try {
    const appointments = await myDB.getAppointments();
    res.json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
});

export default router;
