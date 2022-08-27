import express from "express"; //framework to create routing
import bodyParser from "body-parser"; //enable us to send post request 
import mongoose from "mongoose"; //create models for our post
import cors from "cors"; //enable cross origin request

import postRoutes from "./routes/users.js"

const app = express(); //do this w every express app

app.use('/posts', postRoutes) 

app.use(cors());

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
