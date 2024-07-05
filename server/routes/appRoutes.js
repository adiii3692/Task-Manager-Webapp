import express, { response } from "express";
import { Task } from "../models/task.model.js";
import { User } from "../models/user.model.js";
import validator from "validator";
import mongoose, { mongo } from "mongoose";

const jwt = require('jsonwebtoken');
const router = express.Router();
const ObjectId = mongoose.Types.ObjectId;
const tokenAge = 60 * 60;

//Function to create a jwt
const createToken = (userId)=>{
  return jwt.sign({userId},'Please Do Not Share',{
    expiresIn: tokenAge
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
      return response
        .status(404)
        .json({ message: "Please send all the required fields" });
    }

    //Check if the username already exists in the database
    const replicaUsername = await User.find({
      username: request.body.username,
    }).exec();
    if (replicaUsername.length != 0)
      return response
        .status(404)
        .json({ message: "Please enter a unique username" });
    //Check if email already in database
    const replicaMail = await User.find({ email: request.body.email }).exec();
    if (replicaMail.length != 0)
      return response
        .status(404)
        .json({ message: "Please enter a unique email" });
    //Check if email is valid
    if (!validator.isEmail(request.body.email))
      return response
        .status(404)
        .json({ message: "Please enter a valid email id" });

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
    return response.status;
  } catch (error) {
    return response.status.json({ message: error.message });
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
    //Loop through the array of ObjectIds to search the Tasks database and print the details of each individual task
    actualTasks.map(async (task) => {
      const taskName = await Task.find({ _id: task._id });
      if (taskName.length != 0) {
        console.log("Title: " + taskName[0].title);
        console.log("Due Date: " + taskName[0].dueDate);
        console.log("Description: " + taskName[0].description);
        console.log();
      }
    });

    return response
      .status(200)
      .json({ message: "Found User's Tasks", body: userTasks });
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
      return response.status(404).json({ message: "Please enter a title" });

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
    return response.status(200).json({
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

export default router;