const { MongoClient } = require("mongodb");
// const url = process.env.URI;
const url =
	"mongodb+srv://Mikey:epissalt@cluster0.rojrs.mongodb.net/reviews?retryWrites=true&w=majority";

const dbName = "HealthHub";

module.exports.db = async () => {
	const client = await MongoClient.connect(url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
	const db = client.db(dbName).collection(dbName);
	return db;
};
