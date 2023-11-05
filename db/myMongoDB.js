import { MongoClient } from "mongodb";

function MyMongoDB() {
  const myDB = {};
  const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";

  function connect() {
    const client = MongoClent(uri);
    const db = client.db("MediMemoApp");
    return { client, db };
  }
  myDB.getAppointments = async function (query = {}) {
    const { client, db } = connect();

    try {
      const appointments = await db
        .collection("appointments")
        .find(query)
        .toArray();
      return appointments;
    } finally {
      await client.close();
    }
  };
  return myDB;
}

// since this is an instance of the function MyMongoDB
const myDB = MyMongoDB();
