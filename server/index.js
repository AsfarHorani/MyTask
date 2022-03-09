const express = require('express');
const routes = require("./routes/routes")
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
app.use(express.json());
const helmet = require("helmet")

app.use(routes)
app.use(cors());

dotenv.config();

app.use(helmet());



app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message || "Something went wrong";
  res.status(status).json({
    message: message
  })
})
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'https://mytask123-e4b33.web.app/');
  next();
});


mongoose.connect(`mongodb+srv://asfarh281:${process.env.MONGOPASS}@cluster0.wwsec.mongodb.net/mytask?retryWrites=true&w=majority`)
  .then(result => {
    app.listen(process.env.PORT || 5000);
    console.log("connected")
  }).catch(err => console.log(err))