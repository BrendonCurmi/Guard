const express = require("express");
const app = express();
require("dotenv").config();

// Import middleware
app.use(express.json());

const port = process.env.SERVER_PORT
app.listen(port, () => console.log("Server is up"));
