import express from "express";
import morgan from "morgan";
import path, { dirname } from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { fileURLToPath } from "url";
import patientRouter from "./routes/patientrecord.js";
import indexRouter from "./routes/index.js";
// commented out based on class video, but can use for login stuff?
// import usersRouter from "./routes/users.js";

// Copiolet generated code from class
// import { fileURLToPath } from "url"; moved to line 5
// import { dirname } from "path"; moved to line 2

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let app = express();

app.use(logger("dev"));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
// changed from "public" to "front", "dist"
// vite is going to take the react code and covert it into code that can be served into as standard html
app.use(express.static(path.join(__dirname, "front/build")));

app.use("/api/appointments", indexRouter);
app.use("/api/patients", patientRouter);
// commented out based on class video,but can use for login stuff?
// app.use("/users", usersRouter);

export default app;
