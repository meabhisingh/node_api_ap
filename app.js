import express from "express";
import dotenv from "dotenv";
import NodeCache from "node-cache";

dotenv.config({
  path: "./config.env",
});

const app = express();
const cache = new NodeCache();
const port = process.env.PORT || 3000;

// Defatult Route
app.get("/", (req, res) => {
  res.send("<h1>Working</h1>");
});

// Some API

app.get("/users", (req, res) => {
  if (cache.has("users")) {
    return res.json({
      success: true,
      users: cache.get("users"),
    });
  } else {
    for (let i = 0; i < 4000000000; i++) {}
    const users = ["Abhi", "Nahar", "Ryan", "Eren", "Zeke", "Levi"];

    cache.set("users", users, 300);
    return res.json({
      success: true,
      users,
    });
  }
});

app.listen(port, (c) => {
  console.log(
    `Server is working on Port ${port} in ${process.env.NODE_ENV} Mode.`
  );
});
