import { Request, Response } from "express";
import Project from "../models/project";

export const getProjects = async (req: Request, res: Response) => {
  const response = await Project.find();
  response.map(project => {
        
)

  res.json(response);
};

export const createProject = async (req: Request, res: Response) => {
  const { title, description, contributors, createdBy } = req.body;

  const newProject = new Project({
    title,
    description,
    contributors,
    createdBy,
  });

  try {
    await newProject.save();
    res.json(newProject);
  } catch (error) {
    console.log(error);
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  const { projectId } = req.params;

  try {
    await Project.findByIdAndDelete(projectId);
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};
