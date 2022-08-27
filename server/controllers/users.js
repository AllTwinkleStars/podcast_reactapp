//extract all logic from the router.get functions in routes/user
//and put in here to avoid that user.js file becoming too complex

import mongoose from "mongoose";
import User from "../models/user.js";

const getUsers = async (req, res) => {
  //callback function that executes when some visits /
  console.log("Inside getUsers!!!!")
  try {
    const users = await User.find()
    console.log(users)
    res.status(200).json(users)
  } catch (error) {
    res.status (404).json({ message: error.message })
  }
};

const createUsers = async (req, res) => {
  const {firstName, lastName} = req.body

  const newUser = new User ({firstName, lastName})
  try {
    await newUser.save()
    res.status(201).json(newUser);
  } catch (error) {
    res.status (409).json({ message: error.message })
  }
}

export { getUsers, createUsers }