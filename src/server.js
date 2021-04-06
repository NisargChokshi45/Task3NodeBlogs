require("dotenv").config();
require('./db/conn');
const express = require("express");
const userRoutes = require("./routes/userRoutes");

const app = express();
const port = process.env.PORT;

app.use(express.json({ limit: "10MB" }));
app.use(express.urlencoded({ extended: true }));

app.use('/', userRoutes);

app.listen(port, () => {
    console.log(`Server is running at ${port}`);
});
