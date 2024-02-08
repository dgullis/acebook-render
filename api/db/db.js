const mongoose = require("mongoose");

const connectToDatabase = async () => {
  const mongoDbUrl = "mongodb+srv://danielgullis1:8tX1wuYTLpO9tw7I@cluster0.l9lxqr1.mongodb.net/?retryWrites=true&w=majority"


  if (!mongoDbUrl) {
    console.error(
      "No MongoDB url provided. Make sure there is a MONGODB_URL environment variable set. See the README for more details."
    );
    throw new Error("No connection string provided");
  }

  await mongoose.connect(mongoDbUrl);

  if (process.env.NODE_ENV !== "test") {
    console.log("Successfully connected to MongoDB");
  }
};

module.exports = { connectToDatabase };
