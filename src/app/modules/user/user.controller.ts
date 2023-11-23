import {Request, Response} from "express";
import {UserServices} from "./user.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const result = await UserServices.createUser(user);
    res.status(201).json({
      success: true,
      messgae: "User created successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "something went wrong!",
      error: error,
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsers();
    res.status(201).json({
      success: true,
      messgae: "Users fetched successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "something went wrong!",
      error: error,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const userId: number = Number(req.params.userId);
    const result = await UserServices.getSingleUser(userId);
    res.status(201).json({
      success: true,
      messgae: "Users fetched successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const result = await UserServices.updateUser(user);
    res.status(201).json({
      success: true,
      messgae: "User updated successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error,
    });
  }
};

export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
};
