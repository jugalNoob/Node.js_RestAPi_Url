const express = require("express");
const fs = require("fs");
const status = require('express-status-monitor');

const app = express();
const port = 8000;

// Use the status monitor middleware
app.use(status());

app.use(express.json());

app.get("/", (req, res) => {
    fs.readFile("./sample.txt", (err, data) => {
       
        res.send(data)
    });
});

app.listen(port, () => {
    console.log("Server is listening on port", port);
});
