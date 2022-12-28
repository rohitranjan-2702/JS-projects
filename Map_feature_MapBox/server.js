const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db")

// load environment variables
dotenv.config({path: './config/config.env'});

const app = express();

// BOdy parser
app.use(express.json())

// enable cors
app.use(cors())

// connect db
connectDB();

// ROutes
app.use('/api/v1/hospitals', require('./routes/hospitals'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> 
    console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);