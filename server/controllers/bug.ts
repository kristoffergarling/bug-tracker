import { Request, Response } from "express";
import Bug from "../models/bug";
import Project from "../models/project";

export const createBug = async (req: Request, res: Response) => {
  const { projectId } = req.params;
  console.log(projectId);
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
    project?.bugs.push(newBug);
    await project?.save();

    res.json(newBug);
  } catch (error) {
    console.log(error);
  }
};

export const getBugsByProjectId = async (req: Request, res: Response) => {
  const { projectId } = req.params;

  try {
    const bugs = await Bug.find({ projectId: projectId });
    res.json(bugs);
  } catch (error) {
    console.log(error);
  }
};
