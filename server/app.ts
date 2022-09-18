import express, { Express } from 'express';
import bodyParser from "body-parser";
import cors from "cors";
import authRoutes from "./routes/auth";

const app: Express = express();

app.use("/signup", authRoutes);

app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());

export default app;