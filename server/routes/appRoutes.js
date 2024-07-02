import express from "express";
import { Task } from "../models/task.model.js";
import { User } from "../models/user.model.js";
import validator from "validator";

const router = express.Router();

//The route to sign up
router.post("/signup", async (request, response) => {
  try {
    //Check if all the required fields have been provided
    if (
      !request.body.username ||
      !request.body.email ||
      !request.body.password
    ) {
      return response
        .status(404)
        .json({ message: "Please send all the required fields" });
    }

    //Check if the username already exists in the database
    const replicaUsername = await User.find({username:request.body.username}).exec();
    if (replicaUsername.length!=0) return response.status(404).json({ message: "Please enter a unique username" });
    //Check if email already in database
    const replicaMail = await User.find({email:request.body.email}).exec();
    if (replicaMail.length!=0) return response.status(404).json({ message: "Please enter a unique email" });
    //Check if email is valid
    if (!(validator.isEmail(request.body.email))) return response.status(404).json({ message: "Please enter a valid email id" });

    //Create a new object for the user
    const newUser = {
      username: request.body.username,
      email: request.body.email,
      password: request.body.password,
    };

    //Save the user
    const createdUser = new User(newUser);
    await createdUser.save();

    //Return success message 
    return response
      .status(500)
      .json({ message: "User created", body: createdUser });
    
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({ message: error.message });
  }
});

//Checking a random route
router.get("/signup", (request, response) => {
  try {
    console.log("Webpage working");
  } catch (error) {
    return response.status.json({ message: error.message });
  }
});

export default router;

//Route to log in
router.post("/login", async (request, response) => {
  try {
    if (!request.body.username || !request.body.password) {
        return response.status(404).json({message:"Please enter all required fields"});
    }


  } catch (error) {
    console.log(error.message);
    return response.status(404).send({ message: error.message });
  }
});
