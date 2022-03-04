const express = require('express');
const routes = require("./routes/routes")
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const cors = require("cors");
const app = express();
app.use(bodyParser.json());
app.use(routes)




app.use(cors())


app.use((error, req, res, next) => {
  console.log('from error middleware', error);
  const status = error.statusCode || 500;
  const message = error.message || "Something went wrong";
  res.status(status).json({
    message: message
  })
})



mongoose.connect(`mongodb+srv://asfarh281:978kbRGztVwh8eb@cluster0.wwsec.mongodb.net/mytask?retryWrites=true&w=majority`)
  .then(result => {
    app.listen(process.env.PORT || 5000);
    console.log("connected")
  }).catch(err => console.log(err))