import {Request, Response} from "express";
import {UserServices} from "./user.service";
import userSchema, {orderSchema} from "./user.validation";

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const zodParseData = userSchema.parse(user);
    const result = await UserServices.createUser(zodParseData);
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
    const userId = Number(req.params.userId);
    const user = req.body;
    const zodParseData = userSchema.parse(user);
    const result = await UserServices.updateUser(userId, zodParseData);
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

const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    await UserServices.deleteUser(userId);
    res.status(201).json({
      success: true,
      messgae: "User deleted successfully!",
      data: null,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error,
    });
  }
};

const addUserOrder = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const order = req.body;
    const zodParseData = orderSchema.parse(order);
    await UserServices.addUserOrder(userId, zodParseData);
    res.status(201).json({
      success: true,
      messgae: "Order created successfully!",
      data: null,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error,
    });
  }
};

const getUserOrders = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const result = await UserServices.getUserOrders(userId);
    res.status(201).json({
      success: true,
      messgae: "Order fetched successfully!",
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

const getTotalPriceOfUserOrders = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const result = await UserServices.getTotalPriceOfUserOrders(userId);
    res.status(201).json({
      success: true,
      messgae: "Total price calculated successfully!",
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
  deleteUser,
  addUserOrder,
  getUserOrders,
  getTotalPriceOfUserOrders,
};
