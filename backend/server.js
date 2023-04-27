const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

// Import cookie-parser middleware
const cookies = require("cookie-parser");
app.use(cookies());

// Import middleware
app.use(express.json());

// Import CORS middleware
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
app.use(cors(corsOptions));

// Connect to db
mongoose.connect(process.env.DATABASE_URI, () => console.log("Db"));

const port = process.env.SERVER_PORT
app.listen(port, () => console.log("Server is up"));
