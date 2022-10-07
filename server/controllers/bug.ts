import { Request, Response } from "express";
import Bug from "../models/bug";
import Project from "../models/project";

export const createBug = async (req: Request, res: Response) => {
  const { projectId } = req.params;
  const { title, description, priority, createdBy } = req.body;

  const newBug = new Bug({
    projectId,
    title,
    description,
    priority,
    createdBy,
  });

  try {
    await newBug.save();

    const project = await Project.findById(projectId);
    console.log(newBug);
    project?.bugs.push(newBug);
    await project?.save();

    res.json(newBug);
  } catch (error) {
    console.log(error);
  }
};
