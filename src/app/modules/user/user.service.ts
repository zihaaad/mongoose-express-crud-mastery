import {IUser} from "./user.interface";
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

  const result = await User.findOne({userId});
  return result;
};

const updateUser = async (userId: number, user: IUser) => {
  if (!(await User.isUserExists(userId))) {
    throw new Error("User not found");
  }
  const result = await User.updateOne({userId}, user, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteUser = async (userId: number) => {
  if (!(await User.isUserExists(userId))) {
    throw new Error("User not found");
  }
  const result = await User.deleteOne({userId});
  return result;
};

export const UserServices = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
