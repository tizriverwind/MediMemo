import { MongoClient, ObjectId } from "mongodb";
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
      const db = client.db("records");
      return { client, db };
    } catch (e) {
      console.error("Failed to connect to MongoDB", e); // Log any errors during connection
      throw e; // Re-throw the error to handle it in the calling function
    }
  }
  myDB.getPatients = async function (query = {}) {
    const { client, db } = await connect();

    try {
      const patients = await db.collection("patients").find({}).toArray();
      // console.log("Fetched appointments:", patients); // Add this line to log the fetched data

      return patients;
    } finally {
      await client.close();
    }
  };

  // method to add appointmentt to db
  myDB.addPatient = async function (patientdata) {
    const { client, db } = await connect();
    try {
      patientdata.visit = [];

      const patient = await db.collection("patients").insertOne(patientdata);
      console.log("Inserted appointment:", patient); // Log the inserted appointment to see if it works
      return patient;
    } catch (error) {
      console.error("Error inserting appointment:", error);
      throw error;
    } finally {
      await client.close();
    }
  };

  myDB.updatePatient = async function (request) {
    const { client, db } = await connect();
    try {
      const filter = { _id: new ObjectId(request._id) };

      const update = {
        $set: {
          first_name: request.first_name,
          last_name: request.last_name,
          email: request.email,
          gender: request.gender,
          date_of_birth: request.date_of_birth,
        },
      };
      const options = {
        returnDocument: "after", // This option specifies to return the updated document
      };
      const result = await db
        .collection("patients")
        .findOneAndUpdate(filter, update, options);
      console.log(result);
      if (!result) {
        console.log("No document was found and updated");
        return null; // Return null or some indicator that no document was updated
      } else {
        console.log("Document was updated successfully");
        return result;
      }
    } catch (error) {
      console.error("Error updating patient data:", error);
      throw error;
    } finally {
      await client.close();
    }
  };

  myDB.deletePatient = async function (req) {
    const { client, db } = await connect();
    console.log(req);
    try {
      const result = await db.collection("patients").deleteOne({ id: req.id });
      if (result.deletedCount === 1) {
        console.log("Delete Successful!");
        return true;
      } else {
        console.log("Delete Failed!");
        return false;
      }
    } catch (err) {
      console.log(err.message);
    } finally {
      await client.close();
    }
  };

  return myDB;
}

// since this is an instance of the function MyMongoDB
const myDBInstance = MyMongoDB();

export default myDBInstance;
