const express = require("express");
const path = require("path");
const fs = require("fs");
const uuid = require("uuid");
const db = require("./db/db.json");

const app = express();
const PORT = 5050;

////////////////////////////////////////////////////////////////////
// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

////////////////////////////////////////////////////////////////////
// API Routes
app.get("/api/notes", function (req, res) {
  res.json(db);
});

app.post("/api/notes", function (req, res) {
  db.push(req.body);
  res.send(db);
  // const newNote = {
  //   id: uuid.v4(),
  //   name: req.body.name,
  //   email: req.body.email,
  //   status: "active",
  // };
});

////////////////////////////////////////////////////////////////////
// HTML Routes
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "notes.html"));
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Listener
app.listen(PORT, () => console.log(`server started on port ${PORT}`));
