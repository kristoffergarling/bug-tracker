import { Request, Response } from "express";
import Project from "../models/project";

export const getProjects = async (req: Request, res: Response) => {
  const response = await Project.find();

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

export const addProjectContributor = async (req: Request, res: Response) => {
  const { projectId } = req.params;
  const contributors = req.body;

  try {
    await Project.findByIdAndUpdate(projectId, {
      $set: { contributors: contributors },
    });
    res.json({ message: "Contributor(s) added successfully" });
  } catch (error) {
    console.log(error);
  }
};

export const deleteProjectContributor = async (req: Request, res: Response) => {
  const { projectId, contributor } = req.params;

  try {
    await Project.findByIdAndUpdate(projectId, {
      $pull: { contributors: contributor },
    });
    res.json({ message: "Contributor deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};
