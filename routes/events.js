const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Event = require("../models/event");
const jwt = require("jsonwebtoken");
const db = "mongodb+srv://todolist:todolist@cluster0.tr8eh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(db, function (err) {
    if (err) {
        console.error("Error! " + err);
    } else {
        console.log("Connected to mongodb");
    }
});

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send("Unauthorized request");
    }
    let token = req.headers.authorization.split(" ")[1];
    if (token === "null") {
        return res.status(401).send("Unauthorized request");
    }
    let payload = jwt.verify(token, "secretKey");
    if (!payload) {
        return res.status(401).send("Unauthorized request");
    }
    req.userId = payload.subject;
    next();
}

// get all events
router.get("/", (req, res) => {

    Event.find({}, function (err, events) {
        var eventMap = {};

        events.forEach(function (event) {
            eventMap[event._id] = event;
        });
        res.status(200).send(eventMap);
    });
})


router.post("/new", (req, res) => {
    let eventData = req.body;
    let event = new Event(eventData);
    event.save((err, registeredEvent) => {
        if (err) {
            console.log(err);
        } else {

            res.status(200).send({
                message: "sdkoksopksopko"
            });
        }
    });
});



module.exports = router;