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
// NEW TO DELETE AN APPOINTMENT NOT WORKING
router.delete("/:id", async (req, res) => {
  console.log("ID received for deletion:", req.params.id); //TESTING

  const { id } = req.params;
  try {
    // Replace this with your actual database deletion logic
    const result = await myDB.deleteAppointment(id);
    if (result.deletedCount === 0) {
      return res.status(404).send("No appointment found with that ID.");
    }
    res.status(204).send(); // 204 No Content
  } catch (error) {
    res.status(500).json({ error: "Failed to delete the appointment" });
  }
});
// END OF NEW TO DELETE AN APPOINTMENT

//UPADTING
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  try {
    const result = await myDB.updateAppointment(id, updatedData);
    if (result.modifiedCount === 0) {
      // No document was modified - handle according to your logic
      // Could be that the appointment wasn't found or data was the same
      return res
        .status(404)
        .json({ message: "Appointment not found or data was unchanged" });
    }
    // Send back the updated appointment data or a success message
    res.json({ message: "Appointment updated successfully", data: result });
  } catch (error) {
    console.error("Failed to update the appointment:", error);
    res.status(500).json({ error: "Failed to update the appointment" });
  }
});

// END UPDATING

export default router;
