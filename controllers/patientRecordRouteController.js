import myDB from "../db/DBpatients.js";

export const getPatientsCon = async (req, res) => {
  try {
    myDB.getPatients().then((patients) => {
      res.status(200).json({
        status: "success",
        results: patients.length,
        data: {
          patients,
        },
      });
    });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
};

export const postPatientsCon = async (req, res) => {
  try {
    const newPatient = await myDB.addPatient(req.body);
    res.status(201).json({
      status: "success",
      data: {
        newPatient,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error adding the appointment",
      error: error.message,
    });
  }
};

export const putPatientsCon = async (req, res) => {
  try {
    const updatedPatient = await myDB.updatePatient(req.body);
    res.status(200).json({
      status: "success",
      data: {
        updatedPatient,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Error updating patient",
      error: error.message,
    });
  }
};

export const deletePatientCon = async (req, res) => {
  const inputreq = req.body;
  if (await myDB.deletePatient(inputreq)) {
    res.status(204).json({
      status: "sucess",
      message: "Request successfully deleted",
      data: {
        inputreq,
      },
    });
  } else {
    return res.status(404).json({
      status: "fail",
      message: "More information required to delete a request",
    });
  }
};
