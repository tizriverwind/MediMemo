import express from "express";
let router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  // Send a response without rendering a view
  res.send("Welcome to MediMemo!");
});

export default router;
