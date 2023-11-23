import {Schema, model} from "mongoose";
import {IUser, UserModel} from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";

const userSchema = new Schema<IUser>({
  userId: {
    type: Number,
    required: true,
    unique: true,
  },
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  fullName: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
  },
  age: {type: Number, required: true, maxlength: 3},
  email: {type: String, required: true, unique: true},
  isActive: {type: Boolean, required: true},
  hobbies: {type: [String], required: true},
  address: {
    street: {type: String, required: true},
    city: {type: String, required: true},
    country: {type: String, required: true},
  },
  orders: {type: [String], required: true},
});

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

userSchema.statics.isUserExists = async function (userId: number) {
  const existingUser = await User.findOne({userId});
  return existingUser;
};

export const User = model<IUser, UserModel>("User", userSchema);
