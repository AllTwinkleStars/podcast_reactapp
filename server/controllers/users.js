//extract all logic from the router.get functions in routes/user
//and put in here to avoid that user.js file becoming too complex

import mongoose from "mongoose";
import User from "../models/user.js"; //create user instances
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const secret = "test";

// const getUsers = async (req, res) => {
//   //callback function that executes when some visits /
//   try {
//     const users = await User.find()
//     console.log(users)
//     res.status(200).json(users)
//   } catch (error) {
//     res.status (404).json({ message: error.message })
//   }
// };

// const createUser = async (req, res) => {
//   console.log('I got hereeeeeeee')
//   console.log(req.body)
//   const {firstName, lastName, email, password} = req.body

//   const newUser = new User ({firstName, lastName, email, password})
//   try {
//     await newUser.save()
//     res.status(201).json(newUser);
//   } catch (error) {
//     res.status (409).json({ message: error.message })
//   }
// }

// const getUser = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const user = await User.findById(id);

//     res.status(200).json(user);
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };

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
  console.log("inside backend signup");
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

const updateSubs = async (req, res) => {
  console.log("inside of backend controller");
  //const { id } = req.params;
  const { id, subscriptions } = req.body;
  console.log(subscriptions);

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No user with id: ${id}`);

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { subscriptions },
    {
      new: true,
    }
  );
  res.status(200).json(updatedUser);
};

export { signin, signup, updateSubs };
