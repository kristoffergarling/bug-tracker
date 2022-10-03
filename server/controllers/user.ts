import { Request, Response } from "express";
import User from "../models/user";

export const getAllUsers = async (req: Request, res: Response) => {
  const response = await User.find();

  const users = response.map((user) => {
    return {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
    };
  });

  res.json(users);
};
