import "./dotenv.js"
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./src/routes/router.js";
import dbConnection from "./src/db/dbConnection.js";
import { cloudinaryConfig } from "./src/utils/cloudinary.js";


const app = express();
const port = process.env.PORT;
cloudinaryConfig();

app.use(
  cors({
    origin: process.env.ALLOW_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static("public"))
app.use("/api/v1", router);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    status:errorStatus,
    message: errorMessage,
    errors: err.errors || [],
    data: null,
    success: false,
  });
}) 



dbConnection()
  .then(() =>
    app.listen(port, () => {
      console.log(`Server 🚀  is running at localhost: ${port}`);
    })
  )
  .catch((e) => console.log("MONGO db connection failed !!!  ", e));

