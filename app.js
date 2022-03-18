const express = require("express");
const app = express();
const PORT = 3000;
const { stream, startTimer } = require("./timer");

app.use(express.json());
app.listen(PORT, () =>
  console.log(`Express server currently running on port ${PORT}`)
);

app.get("/timer/", (req, res) => {
  startTimer();
  res.contentType("image/png");
  stream.pipe(res);
});

// can customize countdown in url: "2022-05-24T00:00:00"
app.get("/timer/:time", (req, res) => {
  startTimer(req.params.time);
  res.contentType("image/png");
  stream.pipe(res);
});

app.get("/test", (req, res) => {
  process.stdin.pipe(process.stdout);
});
