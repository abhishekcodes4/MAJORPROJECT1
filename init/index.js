const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../modules/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to DB");
}

main().catch((err) => console.log(err));

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj , owner: "6a4df21840dc3587bbef6e30"}));
    await Listing.insertMany(initData.data);
    console.log("Data was initialized!!");
};

initDB();