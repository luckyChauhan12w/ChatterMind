import dotenv from "dotenv";
dotenv.config();
import express from "express";
import router from "./routes/auth.routes.js";

const app = express();

app.use(express.json());

app.use("/api/v1/auth", router);


export default app;