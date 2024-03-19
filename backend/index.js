const connectToMongo = require('./db')
const express = require('express')
const dotenv = require('dotenv')
const cors = require("cors");
// const ck = require('ckey');

// const path = require('path')
dotenv.config({path:'C:/Users/basat/Desktop/React js/inotebook/backend/.env', debug:true})

const app = express()
const port = 5000
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

connectToMongo()
// console.log(connect)

app.use(express.json())
app.use(cors());


app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
