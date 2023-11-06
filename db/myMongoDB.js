import { MongoClient } from "mongodb";
import "dotenv/config";

function MyMongoDB() {
  const myDB = {};

  const uri = process.env.DATABASE.replace(
    "<PASSWORD>",
    process.env.DATABASE_PASSWORD
  );

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

  // method to add appointmentt to db
  myDB.addAppointment = async function (appointmentData) {
    const { client, db } = await connect();
    try {
      const appointment = await db
        .collection("appointments")
        .insertOne(appointmentData);
      console.log("Inserted appointment:", appointment); // Log the inserted appointment to see if it works
      return appointment;
    } catch (error) {
      console.error("Error inserting appointment:", error);
      throw error;
    } finally {
      await client.close();
    }
  };

  //   // Method to delete an appointment from the database
  //   myDB.deleteAppointment = async function (appointmentId) {
  //     const { client, db } = await connect();
  //     try {
  //       const result = await db
  //         .collection("appointments")
  //         .deleteOne({ _id: ObjectId(appointmentId) });
  //       console.log("Deleted appointment:", result); // Log the result of the deletion
  //       return result;
  //     } catch (error) {
  //       console.error("Error deleting appointment:", error);
  //       throw error;
  //     } finally {
  //       await client.close();
  //     }
  //   };
  return myDB;
}

// since this is an instance of the function MyMongoDB
const myDBInstance = MyMongoDB();

export default myDBInstance;
