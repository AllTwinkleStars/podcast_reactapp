import express from "express";
import mongoose from "mongoose";

import Subscriptions from "../models/subscriptions.js";

const router = express.Router();

const updateSubs = async (req, res) => {
  const { email, subscriptions } = req.body;

  const existingRecord = await Subscriptions.findOne({ email });
  if (!existingRecord)
    return res
      .status(400)
      .json({ message: "No user with that email in the database" });

  const updatedRecord = await Subscriptions.findOneAndUpdate(
    { email },
    { subscriptions },
    {
      new: true, //set the new option to true to return the document after update was applied
    }
  );

  res.status(200).json(updatedRecord);
};

const getSubs = async (req, res) => {
  const { email } = req.query;
  const existingRecord = await Subscriptions.findOne({ email });
  if (!existingRecord)
    return res
      .status(400)
      .json({ message: "No user with that email in the database" });

  res.status(200).json(existingRecord.subscriptions);
};

export { getSubs, updateSubs };
