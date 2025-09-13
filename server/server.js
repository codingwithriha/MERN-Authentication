import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
const port = process.env.PORT || 4000;
connectDB();

const allowedOrigins = ["https://mern-authentication-sg7k.vercel.app"];

app.use(express.json());
app.use(cookieParser());
// app.use(cors({
//   origin: allowedOrigins,
//   credentials: true,
// }));
app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin like Postman or curl
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = `The CORS policy for this site does not allow access from the specified Origin.`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
}));
//API Endpoints
app.get("/", (req, res) => {
  res.send("API Working");
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.listen(port, () => {
  console.log("Server is listening on port " + port);
});
