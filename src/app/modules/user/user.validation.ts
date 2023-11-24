import {z} from "zod";

export const orderSchema = z.object({
  productName: z.string({
    required_error: "Product Name is Required",
  }),
  price: z.number({
    required_error: "Price is Required",
  }),
  quantity: z.number({required_error: "Quantity is Required"}),
});

const userSchema = z.object({
  userId: z.number({
    required_error: "UserId is Required",
  }),
  username: z
    .string({
      description: "username is required",
    })
    .max(50),
  password: z.string({required_error: "Password is Required"}),
  fullName: z.object({
    firstName: z.string({required_error: "firstName is Required"}).max(30),
    lastName: z.string({required_error: "lastName is Required"}).max(30),
  }),
  age: z.number({required_error: "Age is Required"}).max(999),
  email: z
    .string({required_error: "Email is required"})
    .email({
      message: "email is incorrect",
    })
    .toLowerCase(),
  isActive: z.boolean().default(true),
  hobbies: z.array(z.string()),
  address: z.object({
    street: z.string({required_error: "street is Required"}),
    city: z.string({required_error: "city is Required"}),
    country: z.string({required_error: "country is Required"}),
  }),
  orders: z.array(orderSchema).optional(),
});

export default userSchema;
