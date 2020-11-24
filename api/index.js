const express = require("express");
const mongoDB = require("./db/routes");
const cors = require("cors");
const app = express();
const port = 1337;

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
	res.send("For the dark lady!");
});

app.use("/api/mongoDB", mongoDB);

app.listen(port, () => console.log(`Running server on port ${port}`));
