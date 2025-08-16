import express from "express";
import connectDB from "./config/dbConfig.js";

const PORT = 3000;
const app = express();

app.get("/", (req, res) => {
    return res.send("<h1>Welcome Home!</h1>");
});

app.get("/ping", (req, res) => {
    return res.json({message: 'pong'});
})

app.get("/hello", (req, res) => {
    return res.json({message: "Hello, World!"});
})




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});