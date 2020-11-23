const express = require("express");
const mongoDB = require("./db/routes");
const app = express();
const port = 1337;

app.use(express.json());

app.get("/", (req, res) => {
	res.send("For the dark lady!");
});

app.use("/api/mongoDB", mongoDB);

app.listen(port, () => console.log(`Running server on port ${port}`));
