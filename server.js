const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();
const userRouter = require("./routes/user.routes");
const noteRouter = require("./routes/note.routes");
const labelRouter = require("./routes/label.routes");
const authRouter = require("./routes/auth.routes");

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL);

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Mongodb Connnection success!");
});

app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});

app.use("/user", userRouter);

app.use("/notes", noteRouter);

app.use("/labels", labelRouter);

app.use("/auth", authRouter)

module.exports = app;
