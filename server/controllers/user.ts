import { Request, Response } from "express";
import User from "../models/user";

export const getAllUsers = async (req: Request, res: Response) => {
  const response = await User.find();

  const users = response.map((user) => {
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      _id: user._id,
      isAdmin: user.isAdmin,
      registerDate: user.registerDate,
    };
  });

  res.json(users);
};
