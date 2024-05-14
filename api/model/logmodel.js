const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
    level: { 
        type: String, 
        enum: ["info", "error", "success"],
        required: true 
    },
    log_string: { 
        type: String,
        required: true
    },
    timestamp: { 
        type: Date, 
        required: true 
    },
    metadata: {
        source: { 
            type: String 
        }
    }
});

const Log = mongoose.model("Log", logSchema);

module.exports = Log;
