import {Schema, model} from "mongoose";
import {IOrder, IUser, UserModel} from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";

const orderSchema = new Schema<IOrder>({
  productName: {type: String, required: true},
  price: {type: Number, required: true},
  quantity: {type: Number, required: true},
});

const userSchema = new Schema<IUser>({
  userId: {
    type: Number,
    required: [true, "UserId is required"],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
  },
  password: {type: String, required: [true, "Password is required"]},
  fullName: {
    firstName: {
      type: String,
      trim: true,
      required: [true, "firstName is Required"],
    },
    lastName: {
      type: String,
      trim: true,
      required: [true, "lastName is Required"],
    },
  },
  age: {type: Number, required: [true, "Age is required"], maxlength: 3},
  email: {type: String, required: [true, "Email is required"], unique: true},
  isActive: {type: Boolean, required: true},
  hobbies: {type: [String], required: [true, "Hobbies is required"]},
  address: {
    street: {type: String, required: true},
    city: {type: String, required: true},
    country: {type: String, required: true},
  },
  orders: [orderSchema],
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

userSchema.pre("findOneAndUpdate", async function (next) {
  const updated: IOrder | any = this.getUpdate();
  updated.password = await bcrypt.hash(
    updated.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

userSchema.statics.isUserExists = async function (userId: number) {
  const existingUser = await User.findOne({userId});
  return existingUser;
};

export const User = model<IUser, UserModel>("User", userSchema);
