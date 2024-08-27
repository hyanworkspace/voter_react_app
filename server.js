const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 5000;

app.use(bodyParser.json());

app.post("/api/buttonStats", (req, res) => {
  const buttonStats = req.body;
  console.log("Received button stats:", buttonStats);
  res.json({ success: true });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
