const express = require("express");
const app = express();
require("dotenv").config();

// Import middleware
app.use(express.json());

// Import CORS middleware
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
app.use(cors(corsOptions));

const port = process.env.SERVER_PORT
app.listen(port, () => console.log("Server is up"));
