import mongoose from "mongoose";

const subscriptionsSchema = mongoose.Schema({
  email: { type: String, required: true },
  subscriptions: [],
});

const Subscriptions = mongoose.model("Subscriptions", subscriptionsSchema);

export default Subscriptions;
