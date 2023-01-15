//express: for handling HTTP requests and routing
import express from "express";

//body-parser: for parsing the body of incoming requests
import bodyParser from "body-parser";

//mongoose: for interacting with a MongoDB database
import mongoose from "mongoose";

//cors: for handling cross-origin resource sharing (CORS)
import cors from "cors";

//dotenv: for loading environment variables from a .env file
import dotenv from "dotenv";

//helmet: for securing the application with various HTTP headers
import helmet from "helmet";

//morgan: for logging HTTP requests
import morgan from "morgan";

// application routes
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";

/* DATA IMPORTS */
import User from "./models/User.js";
import { dataUser } from "./data/index.js";

/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server Running at: ${PORT}`));
    /* ONLY ADD DATA ONE TIME */

    // User.insertMany(dataUser);
  })
  .catch((error) => console.log(`${error} did not connect`));
