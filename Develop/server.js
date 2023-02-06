const express = require("express");
const path = require("path");
const fs = require("fs");
const PORT = process.env.PORT || 3001;
const app = express();

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//* tells EXPRESS this folder is okay to use
app.use(express.static("public"));

//& function to create unique id by time stamping 
const getData = () => {
  // const db = fs.readFileSync(path.join(__dirname, "db", "db.json","utf-8"));
  const db = fs.readFileSync(("./db/db.json"));
  const parsedJson = JSON.parse(db);
  return parsedJson;
};

//* Route Listeners

app.get("/api/notes", (req, res) => {
  const db = getData();
  res.json(db);
});
app.post("/api/notes", (req, res) => {
  // console.log(req.body);
  let noteObj = {
    title: req.body.title,
    text: req.body.text,
    id: Date.now(),
  };
  // take data thats going into the request body
  // make into a object
  //add that to noteId
  let db = getData();
  // console.log(db);
  db.push(noteObj);
  const fileName = path.join(__dirname, "./db/db.json");
  fs.writeFileSync(fileName, JSON.stringify(db, null, 2));
  res.json(db);
});


//!------------------Delete ----

// app.delete("/api/notes/:id", (req, res) => {
//   let noteId = req.params.id;
//   let grabData = getData();
//   console.log(grabData)
//   let deleteNote = grabData.find(note => note.id === noteId );
//   console.log(deleteNote);
//   let noteIndex = grabData.indexOf(deleteNote);
//   // console.log(noteIndex);
//   grabData.splice(noteIndex, 1);
//   fs.writeFileSync( "./db/db.json", JSON.stringify(grabData));
//   res.json(getData());
// });

app.delete("/api/notes/:id", async (req, res) => {
  let noteId = req.params.id;
  let grabData = await getData();
  let deleteNote = grabData.find(note => note.id === noteId );
  console.log(deleteNote)
  let noteIndex = grabData.indexOf(deleteNote);
  console.log(noteIndex)
  grabData.splice(noteIndex, 1);
  const data = await fs.promises.writeFile('./db/db.json', JSON.stringify(grabData));
  res.json(getData());
});

//!---------------

//^-------------

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "notes.html"));
  // res.sendFile(path.join(__dirname, "public/notes.html"));
  // res.send("test test")
});

app.get("*", (req, res) => {
  // res.sendFile(path.join(__dirname, "public", "index.html"));
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
  
});

