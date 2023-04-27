const express = require("express");
const app = express();

// Import middleware
app.use(express.json());

const port = process.env.SERVER_PORT
app.listen(port, () => console.log("Server is up"));
