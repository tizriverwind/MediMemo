import { MongoClient } from "mongodb";

function MyMongoDB() {
  const myDB = {};
  const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";

  async function connect() {
    try {
      const client = new MongoClient(uri);
      await client.connect(); // Try to connect to MongoDB
      console.log("Successfully connected to MongoDB"); // Log on successful connection
      const db = client.db("test");
      return { client, db };
    } catch (e) {
      console.error("Failed to connect to MongoDB", e); // Log any errors during connection
      throw e; // Re-throw the error to handle it in the calling function
    }
  }
  myDB.getAppointments = async function (query = {}) {
    const { client, db } = await connect();

    try {
      const appointments = await db
        .collection("appointments")
        .find({})
        .toArray();
      console.log("Fetched appointments:", appointments); // Add this line to log the fetched data

      return appointments;
    } finally {
      await client.close();
    }
  };
  return myDB;
}

// since this is an instance of the function MyMongoDB
const myDBInstance = MyMongoDB();

export default myDBInstance;
