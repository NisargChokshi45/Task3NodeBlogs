require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const http = require("http");
const mongoose = require("mongoose");
const routes = require("./routes/routes");

const app = express();

app.use(express.json({ limit: "10MB" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

const server = http.createServer(app);

const port = process.env.PORT;
const mongoUri = process.env.MONGO_URI;

mongoose.connect(
	mongoUri,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	(error) => {
		if (error) console.log("Error connecting to Database !");
		else {
			console.log("Conencted to Database !");
			server.listen(port, () => {
				console.log("Server Started !");
				app.use("/", routes);
			});
		}
	}
);
