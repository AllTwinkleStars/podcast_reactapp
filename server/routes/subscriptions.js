import express from "express";
import { getSubs, updateSubs } from "../controllers/subscriptions.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, getSubs);
router.patch("/", auth, updateSubs);

export default router;
