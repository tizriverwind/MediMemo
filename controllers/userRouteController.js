import myDB from "../db/DBUsers.js";

export const postUsersCon = async (req, res) => {
  try {
    const newUser = await myDB.insertNewUser(req.body);
    res.status(201).json({
      status: "success",
      data: {
        newUser,
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
