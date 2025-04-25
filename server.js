import express from "express";
import cors from "cors";
import initDb from "./db/index.js";
import User from "./models/User.js";

const port = process.env.PORT || 8000;
const app = express();

app.use(cors());

await initDb();

app.get("/", (req, res) => {
  res.json({ message: "Running" });
});

app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json({ data: users });
});

app.post("/users", async (req, res) => {
  const user = await User.create(req.body);
  res.json({ data: user });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
