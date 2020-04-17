const express = require("express");
const projectRouter = require("./projects/projectRouter");
const resourceRouter = require("./resources/resourceRouter");
const server = express();


server.use(express.json());

server.use("/api/projects", projectRouter);
server.use("/api/resources", resourceRouter);

server.get("/", (req,res) => {
    res.send("<h1> Spring</h1>")
})

module.exports = server;