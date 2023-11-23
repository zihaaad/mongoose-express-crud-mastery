import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.send("SERVER IS ACTIVE 🚀");
});

export default app;
