import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
const bcrypt = bcryptjs;

// Schema for the User model
const userModel = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
  },
  { timestamps: true }
);

// Middleware to hash the password before saving it in the database
userModel.pre("save", async function (next) {
  //Only run this function if the password was modifed
  if (!this.isModified("password")) return next();
  const hashedPassword = await bcrypt.hash(this.password, 10);
  this.password = hashedPassword;
});

// A method to verify whether the password the user has entered matches the hash
userModel.methods.verifyPassword = function (userPassword, cb) {
  // Compare
  bcrypt.compare(userPassword, this.password, function (err, isMatching) {
    if (err) return cb(err);
    cb(null, isMatching);
  });
};

export const User = mongoose.model("User", userModel);
