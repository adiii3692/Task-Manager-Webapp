import express, { response } from "express";
import { Task } from "../models/task.model.js";
import { User } from "../models/user.model.js";
import validator from "validator";
import mongoose from "mongoose";
import { createRequire } from "module";
import bcryptjs from "bcryptjs";

const bcrypt = bcryptjs;
const require = createRequire(import.meta.url);
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const router = express.Router();
const ObjectId = mongoose.Types.ObjectId;
const tokenAge = 60 * 60;
express().use(cookieParser());

//Function to create a jwt
const createToken = (userId) => {
  return jwt.sign({ userId }, "jwt-userid-secret-key", {
    expiresIn: tokenAge,
  });
};

//The route to sign up
router.post("/signup", async (request, response) => {
  try {
    //Check if all the required fields have been provided
    if (
      !request.body.username ||
      !request.body.email ||
      !request.body.password
    ) {
      return response.json({
        validated: false,
        message: "Please send all the required fields",
      });
    }

    //Check if the username already exists in the database
    const replicaUsername = await User.find({
      username: request.body.username,
    }).exec();
    if (replicaUsername.length != 0)
      return response.json({
        validated: false,
        message: "Please enter a unique username",
      });
    //Check if email already in database
    const replicaMail = await User.find({ email: request.body.email }).exec();
    if (replicaMail.length != 0)
      return response.json({
        validated: false,
        message: "Please enter a unique email",
      });
    //Check if email is valid
    if (!validator.isEmail(request.body.email))
      return response.json({
        validated: false,
        message: "Please enter a valid email id",
      });

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
      .status(200)
      .json({
        validated: true,
        message: "You have signed up!",
        body: createdUser,
      });
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({ message: error.message });
  }
});

//Route to log in
router.post("/login", async (request, response) => {
  try {
    if (!request.body.username || !request.body.password) {
      return response
        .status(404)
        .json({ message: "Please enter all required fields" });
    }

    //Check if username and password exist in the database
    const checkUsername = await User.find({ username: request.body.username });
    if (checkUsername.length == 0)
      return response.json({
        validated: false,
        message: "This username does not exist",
      });
    const userPassword = checkUsername[0].password;
    const checkPassword = bcrypt.compareSync(
      request.body.password,
      userPassword
    );
    if (!checkPassword)
      return response.json({
        validated: false,
        message: "Please enter a valid password",
      });

    //Create a jwt token and send it using cookies
    const jwToken = createToken(checkUsername[0]._id);
    response.cookie("jwt", jwToken, {
      sameSite: 'none',
      secure: true,
      path: '/',
      httpOnly: false,
      maxAge: 60 * 1000 * 10,

    });

    return response
      .status(200)
      .json({ validated: true, message: "User logged in" });
  } catch (error) {
    console.log(error.message);
    return response.status(404).send({ message: error.message });
  }
});

//Route to get all the tasks of a logged in user as an array of object ID's
router.get("/receive/:id", async (request, response) => {
  try {
    //Id of logged in user
    const { id } = request.params;
    // Get the tasks associated with that user
    const userTasks = await User.find({ _id: id });
    //Get the object Ids of the tasks as an array
    const actualTasks = userTasks[0].tasks;
    const foundTasks = await Task.find({_id:{$in:actualTasks}});

    return response
      .status(200)
      .json({ message: "Found User's Tasks", body: foundTasks });
  } catch (error) {
    console.log(error.message);
    return response.status(404).send({ message: error.message });
  }
});

//Route to make a task
router.post("/create/:id", async (request, response) => {
  try {
    //Verify if user entered a title for the task
    if (!request.body.title)
      return response.json({
        validated: false,
        message: "Please enter a title",
      });

    //Make a new object for the task
    const newTask = {
      title: request.body.title,
      dueDate: request.body.dueDate,
      description: request.body.description,
    };

    //Create a new Task document
    const createdTask = new Task(newTask);
    await createdTask.save();

    //Find the user that made the task and add it to their tasks array
    const { id } = request.params;
    const creatingUser = await User.find({ _id: id }).exec();
    creatingUser[0].tasks.push(createdTask);
    creatingUser[0].save();
    return response
      .status(200)
      .json({
        validated: true,
        message: `Created a new task for the user: ${creatingUser[0].username}`,
        body: createdTask,
      });
  } catch (error) {
    console.log(error.message);
    return response.status(404).send({ message: error.message });
  }
});

//Route to update a task
router.put("/update/:id", async (request, response) => {
  try {
    //Get the original task
    const { id } = request.params;
    let originalTask = await Task.find({ _id: id }).exec();
    if (!originalTask)
      return response.status(404).send({ message: "The task does not exist" });
    originalTask = originalTask[0];

    //Make the new task
    const newTask = {};
    //Change the parameters if given in request or keep them the same as before
    request.body.title
      ? (newTask.title = request.body.title)
      : (newTask.title = originalTask.title);
    request.body.dueDate
      ? (newTask.dueDate = request.body.dueDate)
      : (newTask.dueDate = originalTask.dueDate);
    request.body.description
      ? (newTask.description = request.body.description)
      : (newTask.description = originalTask.description);

    //Update the task
    const updatedTask = await Task.findByIdAndUpdate(id, newTask);

    return response
      .status(200)
      .json({ message: "The task has been updated", body: updatedTask });
  } catch (error) {
    console.log(error.message);
    return response.status(404).send({ message: error.message });
  }
});

//Route to delete a task
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask)
      return response.status(404).send({ message: "The task does not exist" });

    const TaskObjectId = new ObjectId(id);
    const updateUserTask = await User.updateMany(
      {},
      { $pull: { tasks: TaskObjectId } }
    );

    return response.status(200).json({
      message: "Task has been deleted",
      body: deletedTask,
      updatedUser: updateUserTask,
    });
  } catch (error) {
    console.log(error.message);
    return response.status(404).send({ message: error.message });
  }
});

//Route to get the task's info
router.get('/info/:id',async(request,response)=>{
  try {
    const {id} = request.params;
    const taskInfo = await Task.find({_id:id});
    const finalInfo = taskInfo[0];
    return response.status(200).json({message:"Found Task!",taskInfo:finalInfo})
  } catch (error) {
    console.log(error.message);
    return response.status(404).send({ message: error.message });
  }
});

export default router;