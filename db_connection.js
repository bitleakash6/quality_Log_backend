const mongoose = require("mongoose");
require('dotenv').config();

mongoose.set("strictQuery", false);
//const URL = "mongodb://0.0.0.0:27017/logingestor"
//const mongoURL = process.env.MONGODB_URL_LOCAL;
const mongoURL = process.env.MONGODB_URL;

try {
    mongoose.connect(mongoURL,);

    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "MongoDB connection error:"));
    db.once("open", () => {
        console.log("Connected to Database");
    });
} catch (error) {
    console.error("Error while connecting to the database:", error);
}