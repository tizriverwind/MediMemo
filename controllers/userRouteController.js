import myDB from "../db/DBUsers.js";
import crypto from "crypto";

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

export const insertUserCon = async (req, res) => {
  console.log("insertUser request:  ", req.body);
  try {
    const newUser = await myDB.getUserbyUsername(req.body.username);
    if (newUser) {
      return res
        .status(400)
        .json({ ok: false, msg: "Username already exists" });
    }
    var salt = crypto.randomBytes(16);
    crypto.pbkdf2(
      req.body.password,
      salt,
      310000,
      32,
      "sha256",
      async function (err, hashedPassword) {
        if (err) {
          return next(err);
        }

        const insertResponse = await myDB.insertUser({
          username: req.body.username,
          hashedPassword: hashedPassword.toString("hex"),
          salt: salt.toString("hex"),
        });

        console.log("inserted", insertResponse);

        res.status(200).json({ ok: true, msg: "Signed up " });
      }
    );
  } catch (e) {
    console.log("error from insetUserCon", e.message);
  }
};

export const authenticateAccountCon = async (req, res) => {
  try {
    if (await myDB.authenticateUsers(req.body)) {
      res.status(200).json({
        status: "success",
      });
    } else {
      return res.status(404).json({
        status: "fail",
        message: "Wrong credentials",
      });
    }
  } catch (e) {
    console.log(e.message);
  }
};
