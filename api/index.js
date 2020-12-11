const express = require("express");
const mongoDB = require("./db/routes");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 1337;

app.use(express.static("./client/build"));
app.use(cors());
app.use(express.json());

app.get("/test", (req, res) => {
	res.send("For the dark lady!");
});

app.use("/api/mongoDB", mongoDB);

const server = require("http").createServer(app);
const io = require("socket.io")(server);
io.on("connection", (socket) => {
	socket.on("message", ({ from, to, message }) => {
		io.emit("message", { from, to, message });
	});
});

server.listen(port, () => console.log(`Running app server on port ${port}`));
