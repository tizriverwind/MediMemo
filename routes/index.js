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

router.route("/").get(async (req, res) => {
  try {
    myDB.getAppointments().then((appts) => {
      res.status(200).json({
        status: "success",
        results: appts.length,
        data: {
          appts,
        },
      });
    });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
});

// to add pointments to db
router.route("/").post(async (req, res) => {
  try {
    const newAppointment = await myDB.addAppointment(req.body);
    res.status(201).json({
      status: "success",
      data: {
        appointment: newAppointment,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error adding the appointment",
      error: error.message,
    });
  }
});

export default router;
