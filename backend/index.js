const express = require("express");
const mongoose = require("mongoose");
const StolenItems = require('./models/stolen.model');
const app = express();
const cors = require('cors');
const stolenItemRoute = require("./routes/stolen.route")
const geminiRoute = require("./routes/gemini.route");
const dotenv = require('dotenv')
dotenv.config()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())

//ROUTES
app.use("/api/stolen-items", stolenItemRoute);
app.use("/api/gemini", geminiRoute);

app.get('/', (req,res) => {
  res.send("Hello from node api");
})

//mongoose connection
mongoose.connect(process.env.MONGO_API)
.then(() => {
  console.log("connected to database");
  //START SERVER
app.listen(5000, () => console.log("Server running on port 5000"));
})
.catch( (err) => {
  console.log("connection failed");
  console.log(err);
})