const getPerson = async (data, query) => {
	const person = await data.find({ firstName: query }).toArray();
	return person;
};

const getGroupReviews = async (data, query) => {
	const productGroupReviews = await data.find({ productGroup: query }).toArray();
	return productGroupReviews;
};

const getAll = async (data) => {
	const allData = await data.find().toArray();
	return allData;
};

module.exports = {
	getPerson,
	getGroupReviews,
	getAll,
};
