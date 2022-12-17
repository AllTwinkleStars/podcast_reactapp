import express from "express";

import { signin, signup, updateSubs } from "../controllers/users.js"; //dont forget to add users.js, in react we don't need this for need this for node.js

const router = express.Router();

// router.get('/', getUsers)
// router.get("/:id", getUser);
// router.post('/', createUser)
router.post("/signin", signin);
router.post("/signup", signup);
router.patch("/subscriptions", updateSubs);

export default router;
