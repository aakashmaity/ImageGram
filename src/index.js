import express from "express";
import connectDB from "./config/dbConfig.js";
import apiRouter from "./routers/apiRouter.js"
import { isAuthenticated } from "./middlewares/authMiddleware.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swaggerConfig.js";

const PORT = 3000;
const app = express();

app.use(express.text())
app.use(express.json());      // Middleware for every single req to parse JSON req bodies
app.use(express.urlencoded({ extended: true }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use("/api", apiRouter)    // If any URL starts with /api, then forward to apiRouter to handle the request

app.get("/", (req, res) => {
    return res.send("<h1>Welcome Home!</h1>");
});


app.get("/hello", (req, res) => {
    const params = req.query;
    console.log("Query Params:", params);

    const body = req.body;
    console.log("Request Body:", body);

    const user = req?.user
    console.log("userr: ", user);
    
    return res.json({message: "Hello, World!", params, body, user});
})




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});