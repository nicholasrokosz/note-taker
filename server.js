const express = require("express");
const path = require("path");
const fs = require("fs");
const uuid = require("uuid");
const notes = require("./db/db.json");
const { Console } = require("console");

const app = express();
var PORT = process.env.PORT || 3051;

////////////////////////////////////////////////////////////////////
// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

////////////////////////////////////////////////////////////////////
// API Routes
app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/db/db.json"));
  // res.json(notes);
});

app.post("/api/notes", (req, res) => {
  const notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  const newNote = req.body;
  newNote.id = uuid.v4();
  notes.push(newNote);
  fs.writeFileSync("./db/db.json", JSON.stringify(notes));
  res.json(notes);
});

app.delete("/api/notes/:id", (req, res) => {
  const notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  fs.writeFileSync(
    "./db/db.json",
    JSON.stringify(notes.filter((note) => note.id !== req.params.id))
  );
  res.json(notes);
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
