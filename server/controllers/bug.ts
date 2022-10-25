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

export const getBugs = async (req: Request, res: Response) => {
  const response = await Bug.find();

  res.json(response);
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

export const editBug = async (req: Request, res: Response) => {
  const { bugId } = req.params;
  const { title, description, priority } = req.body;

  try {
    const bug = await Bug.findById(bugId);
    bug?.set({ title, description, priority, updatedAt: Date.now() });
    await bug?.save();

    res.json(bug);
  } catch (error) {
    console.log(error);
  }
};

export const changeBugStatus = async (req: Request, res: Response) => {
  const { bugId } = req.params;
  const { isOpen } = req.body;

  try {
    const bug = await Bug.findById(bugId);
    bug?.set({ isOpen, updatedAt: Date.now() });
    await bug?.save();

    res.json(bug);
  } catch (error) {
    console.log(error);
  }
};

export const deleteBug = async (req: Request, res: Response) => {
  const { bugId } = req.params;

  try {
    const bug = await Bug.findById(bugId);
    const project = await Project.findById(bug?.projectId);
    project?.bugs.pull(bugId);
    await bug?.remove();
  } catch (error) {
    console.log(error);
  }
};
