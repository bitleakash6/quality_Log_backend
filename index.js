const express = require("express");
const app = express();
const routes = require("./api/routes/routeindex");
const cors = require("cors");
const bodyParser = require("body-parser");
require('dotenv').config();


//database connection
require("./db_connection");

const PORT = process.env.PORT || 3000;

// app.get('/', function (req, res) {
//     res.send('Welcome to my Qaulity_Log_Control......');
// })

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    cors({
       // origin: "http://localhost:3001", // <-- location of the react app were connecting to
      //  origin: "https://quality-log-backend.onrender.com/",
       // credentials: true,
    })
);

// Route
app.use("/", routes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
