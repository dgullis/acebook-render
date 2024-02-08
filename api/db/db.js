const mongoose = require("mongoose");

const connectToDatabase = async () => {
  const mongoDbUrl = "mongodb+srv://danielgullis1:2WjtZSaxQcQ1xHzH@cluster0.zwrd5gm.mongodb.net/?retryWrites=true&w=majority"

  const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  }

  if (!mongoDbUrl) {
    console.error(
      "No MongoDB url provided. Make sure there is a MONGODB_URL environment variable set. See the README for more details."
    );
    throw new Error("No connection string provided");
  }

  await mongoose.connect(mongoDbUrl, connectionParams);

  if (process.env.NODE_ENV !== "test") {
    console.log("Successfully connected to MongoDB");
  }
};

module.exports = { connectToDatabase };
