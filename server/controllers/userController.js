const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();

  res.status(200).json(users);
});

const addUser = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const userExists = await User.findOne({ name });

  if (userExists) {
    res.status(400);
    throw new Error("user already exists");
  }

  const user = await User.create({
    name,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(400);
    throw new Error("user not found");
  }

  await user.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  addUser,
  getUsers,
  deleteUser,
};
