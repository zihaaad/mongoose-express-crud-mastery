import {IUser} from "./user.interface";
import {User} from "./user.model";

const createUser = async (user: IUser) => {
  const result = await User.create(user);
  return result;
};

const getAllUsers = async () => {
  const result = await User.find({}, "username fullName age email address");
  return result;
};

export const UserServices = {
  createUser,
  getAllUsers,
};
