const { MongoClient, ServerApiVersion } = require("mongodb");

// Replace the placeholder with your Atlas connection string
const uri = process.env.MONGODB_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function dbConnect() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    const database = client.db("sync");
    return database;
  } catch (e) {
    console.log("Connection to MongoDB failed");
    await client.close();
  }
}
module.exports = dbConnect;
