import express from "express";
let router = express.Router();

/* GET home page. */
router.get("/api/data", function (req, res, next) {
  // Send a response without rendering a view
  //res.send("Welcome to MediMemo!");
  res.json([1, 2, 3]);
});

export default router;
