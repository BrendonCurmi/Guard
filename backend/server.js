const express = require("express");
// const https = require("https");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

// const fs = require("fs");
// const key = fs.readFileSync("../security/key.pem");
// const cert = fs.readFileSync("../security/cert.pem");

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

const xss = require("xss-clean");
app.use(xss());

const authRouter = require("./auth/userRoutes");
app.use("/api/auth", authRouter);

// Authenticate JSON Web Token for routes below
const authenticateJwt = require("./middleware/authenticateJWT");
app.use(authenticateJwt);

const routeRouter = require("./components/accounts/accountRoutes");
app.use("/api", routeRouter);

const trashRouter = require("./components/trash/trashRoutes");
app.use("/api", trashRouter);

const pinRouter = require("./components/pins/pinRoutes");
app.use("/api", pinRouter);

const folderRoutes = require("./components/folders/folderRoutes");
app.use("/api", folderRoutes);

const noteRoutes = require("./components/notes/noteRoutes");
app.use("/api", noteRoutes);

const vaultRoutes = require("./components/vault/vaultRoutes");
app.use("/api", vaultRoutes);

// const server = https.createServer({key: key, cert: cert }, app);

const port = process.env.SERVER_PORT
app.listen(port, () => console.log("Server is up"));
