const express = require("express");
const mongoose = require("mongoose");
const StolenItems = require('./models/stolen.model');
const app = express();
const cors = require('cors');
const stolenItemRoute = require("./routes/stolen.route")
const geminiRoute = require("./routes/gemini.route");


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
mongoose.connect('mongodb+srv://admin:oKyai9ImEoHazoZv@stolen-items.d6foz.mongodb.net/?retryWrites=true&w=majority&appName=Stolen-items')
.then(() => {
  console.log("connected to database");
  //START SERVER
app.listen(5000, () => console.log("Server running on port 5000"));
})
.catch( (err) => {
  console.log("connection failed");
  console.log(err);
})