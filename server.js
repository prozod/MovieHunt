const express = require("express");
const app = express();
const path = require("path");
const port = 3000;


app.use("/js", express.static(path.join(__dirname, "src", "js")));
app.use("/css", express.static(path.join(__dirname, "src", "css")));
app.use("/css", express.static(path.join(__dirname, "node_modules/@glidejs/glide/dist", "css")));
app.use("/images", express.static(path.join(__dirname, "images")));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/popular", (req, res) => {
  res.sendFile(__dirname + "/popular.html");
});

app.get("/upcoming", (req, res) => {
  res.sendFile(__dirname + "/upcoming.html");
});

app.get("/toprated", (req, res) => {
  res.sendFile(__dirname + "/toprated.html");
});

app.get("/search", (req, res) => {
  res.sendFile(__dirname + "/search.html");
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
