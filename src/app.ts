import express from "express";
import cors from "cors";
import {UserRoutes} from "./app/modules/user/user.route";

const app = express();

// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use("/api/users", UserRoutes);

app.get("/", (req, res) => {
  res.send("SERVER IS ACTIVE 🚀");
});

export default app;
