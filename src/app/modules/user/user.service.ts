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
  const result = await User.find({}, "username fullName age email address");
  return result;
};

const getSingleUser = async (userId: number) => {
  if (!(await User.isUserExists(userId))) {
    throw new Error("User not found");
  }

  const result = await User.findOne({userId});
  return result;
};

export const UserServices = {
  createUser,
  getAllUsers,
  getSingleUser,
};
