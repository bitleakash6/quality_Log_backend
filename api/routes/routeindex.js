const express = require('express');
const router = express.Router();

const logController = require("../controller/logAPI");


router.post("/", logController.insertLog);
router.post("/level", logController.index);


module.exports = router