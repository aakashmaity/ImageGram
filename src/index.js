import express from "express";
import connectDB from "./config/dbConfig.js";
import postRouter from "./routers/post.js"

const PORT = 3000;
const app = express();

app.use(express.json()); // Middleware for every single req to parse JSON req bodies
app.use(express.urlencoded({ extended: true }));
app.use('/posts', postRouter)


app.get("/", (req, res) => {
    return res.send("<h1>Welcome Home!</h1>");
});



// app.post("/post",upload.single('image'), createPost)

// app.get("/post", findAllPosts)

app.get("/hello", (req, res) => {
    const params = req.query;
    console.log("Query Params:", params);

    const body = req.body;
    console.log("Request Body:", body);
    return res.json({message: "Hello, World!", params, body});
})




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});