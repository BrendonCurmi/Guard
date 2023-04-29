const express = require("express");
const https = require("https");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

const fs = require("fs");
const key = fs.readFileSync("../security/key.pem");
const cert = fs.readFileSync("../security/cert.pem");

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

const server = https.createServer({key: key, cert: cert }, app);
app.get("/", (req, res) => { res.send("This is a test") });

const port = process.env.SERVER_PORT
server.listen(port, () => console.log("Server is up"));
