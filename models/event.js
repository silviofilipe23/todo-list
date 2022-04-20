const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    date: { 
        type: Date, 
        default: Date.now
    },
    title: {
        type: String, 
        required: true
    },
    description: { 
        type: String, 
        required: true 
    },
    status: { 
        type: Boolean, 
        default: false 
    },
    user: {
        type: String,
        required: true
    }
  });

module.exports = mongoose.model("event", eventSchema, "events");