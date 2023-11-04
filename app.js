import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";

import indexRouter from "./routes/index.js";
// commented out based on class video, but can use for login stuff?
// import usersRouter from "./routes/users.js";

let app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
// commented out based on class video,but can use for login stuff?
// app.use("/users", usersRouter);

export default app;
