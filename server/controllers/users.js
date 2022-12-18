//extract all logic from the router.get functions in routes/user
//and put in here to avoid that user.js file becoming too complex

import mongoose from "mongoose";
import User from "../models/user.js"; //create user instances
import Subscriptions from "../models/subscriptions.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const secret = "test";

const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      secret,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ userData: existingUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const userData = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    await Subscriptions.create({
      email,
      subscriptions: []
    });

    const token = jwt.sign(
      { email: userData.email, id: userData._id },
      secret,
      {
        expiresIn: "1h",
      }
    );

    res.status(201).json({ userData, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });

    console.log(error);
  }
};


export { signin, signup};
