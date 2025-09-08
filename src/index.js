import express from "express";
import connectDB from "./config/dbConfig.js";
import apiRouter from "./routers/apiRouter.js"
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swaggerConfig.js";
import ip from "ip"
import { rateLimit } from 'express-rate-limit'
import cors from "cors"
import cookieParser from "cookie-parser";

const PORT = process.env.PORT || 8000;
const app = express();


// trust Vercel's reverse proxy so req.ip works correctly - for rate-limitting
app.set("trust proxy", 1);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500, // Limit each IP to 500 requests per `windowMS` (here, per 15 minutes)
  message: 'Too many requests from this IP, please try again after a short break.'
})

app.use(limiter); // Apply rate limiting to all requests

app.use(express.text())
app.use(express.json());      // Middleware for every single req to parse JSON req bodies
app.use(express.urlencoded({ extended: true }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// For cross origin resource sharing with frontend 
app.use(cors({
  origin: [process.env.FRONTEND_APP_URL, "http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(cookieParser())

// Mount API under /api so paths are consistent locally and on Vercel
app.use("/api", apiRouter)

app.get("/", (req, res) => {
    return res.send("<h1>Welcome to ImageGram!</h1>");
});


app.get("/hello", (req, res) => {
    const params = req.query;
    console.log("Query Params:", params);

    const body = req.body;
    console.log("Request Body:", body);

    const user = req?.user
    console.log("userr: ", user);

    const ipAddr = ip.address();
    
    return res.json({message: "Hello! World",ip: ipAddr, params, body, user});
})

// Export serverless handler for Vercel
export default async function handler(req, res) {
  await connectDB();
  return app(req, res);
}

// Local development: start HTTP server if not running on Vercel
if (!process.env.VERCEL) {
  (async () => {
    try {
      await connectDB();
      app.listen(PORT, () => {
        console.log(`🚀 Server running locally on port ${PORT}`);
      });
    } catch (err) {
      console.error("❌ Failed to start local server", err);
      process.exit(1);
    }
  })();
}