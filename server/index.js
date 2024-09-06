import express, { json, request, response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import { mongodbURL, PORT } from "./config.js";
import appRoutes from './routes/appRoutes.js'

//Express instance
const app = express();

//Cors
app.use(cors({
  origin:true,
  credentials:true
}));

//Middleware to pars request body as json
app.use(express.json());

//Landing page for the app
app.get("/", (request, response) => {
  return response.send("Welcome to AD's To Do App On Docker");
});

//Establish mongoDB connection
mongoose
  .connect(mongodbURL)             
  .then(() => {
    console.log("App connected to the database");
    app.listen(PORT, () => {
      console.log("App is listening to port: " + PORT);
    });
  })
  .catch((error) => console.log(error));

app.use('/',appRoutes);
