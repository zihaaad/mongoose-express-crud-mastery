import {IOrder, IUser} from "./user.interface";
import {User} from "./user.model";

const createUser = async (user: IUser) => {
  if (await User.isUserExists(user.userId)) {
    throw new Error("User Already Exists");
  }

  const result = await User.create(user);
  return result;
};

const getAllUsers = async () => {
  const result = await User.find().select(
    "username fullName age email address"
  );
  return result;
};

const getSingleUser = async (userId: number) => {
  if (!(await User.isUserExists(userId))) {
    throw new Error("User not found");
  }

  const result = await User.findOne({userId}).select("-_id -__v -orders");
  return result;
};

const updateUser = async (userId: number, user: IUser) => {
  if (!(await User.isUserExists(userId))) {
    throw new Error("User not found");
  }
  const result = await User.findOneAndUpdate({userId}, user, {
    new: true,
    runValidators: true,
  }).select("-orders -__v -_id");
  return result;
};

const deleteUser = async (userId: number) => {
  if (!(await User.isUserExists(userId))) {
    throw new Error("User not found");
  }
  const result = await User.deleteOne({userId});
  return result;
};

const addUserOrder = async (userId: number, order: IOrder) => {
  if (!(await User.isUserExists(userId))) {
    throw new Error("User not found");
  }
  const result = await User.updateOne({userId}, {$addToSet: {orders: order}});
  return result;
};

const getUserOrders = async (userId: number) => {
  const result = await User.findOne({userId}).select("orders -_id");
  return result;
};

const getTotalPriceOfUserOrders = async (userId: number) => {
  if (!(await User.isUserExists(userId))) {
    throw new Error("User not found");
  }

  const result = await User.aggregate([
    {
      $match: {
        userId: userId,
      },
    },
    {
      $unwind: "$orders",
    },
    {
      $group: {
        _id: null,
        totalPrice: {
          $sum: {
            $multiply: ["$orders.price", "$orders.quantity"],
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        totalPrice: 1,
      },
    },
  ]);

  return result;
};

export const UserServices = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  addUserOrder,
  getUserOrders,
  getTotalPriceOfUserOrders,
};
