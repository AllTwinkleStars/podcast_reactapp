import express from "express"; //framework to create routing
import bodyParser from "body-parser"; //enable us to send post request
import mongoose from "mongoose"; //create models for app users
import cors from "cors"; //enable cross origin request

import userRoutes from "./routes/users.js";
import subscriptionsRoutes from "./routes/subscriptions.js";

const app = express(); //do this w every express app
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors(corsOptions));

app.use("/user", userRoutes);
app.use("/subscriptions", subscriptionsRoutes);

//connect server to mongoDB atlas
const CONNECTION_URL =
  "mongodb+srv://user1:2020EnjoyLife@cluster0.zrmcvnc.mongodb.net/?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));
