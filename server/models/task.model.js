import mongoose from "mongoose";

const taskModel = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    dueDate:{
        type: Date,
        default: Date.now
    },

    description:{
        type:String,
        default: "No Description"
    }

  },
  { timestamps: true }
);

export const Task = mongoose.model('Task',taskModel);