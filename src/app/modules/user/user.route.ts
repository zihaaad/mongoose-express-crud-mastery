import express from "express";
import {UserControllers} from "./user.controller";

const router = express.Router();

router.post("/", UserControllers.createUser);
router.get("/", UserControllers.getAllUsers);
router.put("/:userId", UserControllers.updateUser);
router.get("/:userId", UserControllers.getSingleUser);
router.delete("/:userId", UserControllers.deleteUser);

export const UserRoutes = router;
