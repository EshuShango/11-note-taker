const express = require("express");
const path = require("path");
const fs = require("fs");
const PORT = 3001;
const app = express();

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//* tells EXPRESS this folder is okay to use
app.use(express.static("public"));

//& func for route
const getData = () => {
  const db = fs.readFileSync(path.join(__dirname, "db", "db.json"), "utf-8");
  const parsedJson = JSON.parse(db);
  return parsedJson;
};

//* Route Listeners

app.get("/api/notes", (req, res) => {
  const db = getData();
  res.json(db);
});
app.post("/api/notes", (req, res) => {
  console.log(req.body);
  let noteObj = {
    title: req.body.title,
    text: req.body.text,
    id: Date.now()
  }
  // take data thats going into the request body
  // make into a object 
  //add that to noteId 
  let db = getData();
  db.push(noteObj);
  const fileName =  path.join(__dirname, "db", "db.json")
  fs.writeFileSync(fileName, JSON.stringify(db, null, 2) );
  res.json(db);
});

//^-------------

// '^/$|/index.(html)?
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "notes.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

//!--------
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'index.html'));
//   });
//!--------

//^-----ADDED CODE
// //Get route for notes page
// app.get("/notes", (req, res) => {
//   res.sendFile(path.join(__dirname, "public/notes.html"));
//   console.info(`${req.method} request received for\n/Notes`);
// });

// //Get route for home page
// app.get("/index", (req, res) => {
//   res.sendFile(path.join(__dirname, "public/index.html"));
//   console.info(`${req.method} request received for \n/Index`);
// });

//^----------

//!----------IDK the code below------
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
//!--------

//^-----------INFO IDK what todo with yet----

// GET request
//
// app.get('/api/reviews', (req, res) => {
//   // Let the client know that their request was received
//   res.json(`${req.method} request received`);

//   // Show the user agent information in the terminal
//   console.info(req.rawHeaders);

//   // Log our request to the terminal
//   console.info(`${req.method} request received`);
// });
//^----------

//^-----------INFO IDK what todo with yet----
// POST request
// app.post('/api/reviews', (req, res) => {
//   // Let the client know that their POST request was received
//   res.json(`${req.method} request received`);

//   // Show the user agent information in the terminal
//   console.info(req.rawHeaders);

//   // Log our request to the terminal
//   console.info(`${req.method} request received`);
// });
//^----------

// app.listen(PORT, () =>
// console.log(`Express server listening on port ${PORT}!`)
// );
