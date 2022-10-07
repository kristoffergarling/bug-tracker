import express, { Express } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import authRoutes from "./routes/auth";
import projectRoutes from "./routes/project";
import userRoutes from "./routes/user";
import bugRoutes from "./routes/bug";

const app: Express = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", authRoutes, projectRoutes);
app.use("/users", userRoutes);
app.use("/projects", projectRoutes);
app.use("/projects", bugRoutes);

export default app;
