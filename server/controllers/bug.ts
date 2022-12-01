import { Request, Response } from "express";
import Bug from "../models/bug";
import Comment from "../models/comment";
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

export const addBugComment = async (req: Request, res: Response) => {
  const { bugId } = req.params;
  const commentData = req.body;

  try {
    const bug = await Bug.findById(bugId);
    const comment = new Comment(commentData);
    await comment.save();

    bug?.comments.push(JSON.stringify(JSON.stringify(comment)));
    await bug?.save();
    res.json(commentData);
  } catch (error) {
    console.log(error);
  }
};

export const fetchCommentsByBugId = async (req: Request, res: Response) => {
  const { bugId } = req.params;

  try {
    const bug = await Bug.findById(bugId);
    const comments = bug?.comments.map((comment: string) =>
      JSON.parse(comment)
    );
    res.json(comments);
  } catch (error) {
    console.log(error);
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  const { bugId, createdAt } = req.params;

  try {
    const bug = await Bug.findById(bugId);
    const comments = bug?.comments.filter(
      (comment: string) => comment.includes(createdAt) === false
    );

    bug?.set({ comments });
    await bug?.save();

    res.json(bug);
  } catch (error) {
    console.log(error);
  }
};
