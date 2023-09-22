const { MongoClient, ObjectID } = require("mongodb");

const mongoURI = "mongodb://127.0.0.1:27017/mydb";
const client = new MongoClient(mongoURI, { useNewUrlParser: true });

async function connectToMongo() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

async function insertRecord(newRecord, collectionName) {
  try {
    const db = client.db();
    const collection = db.collection(collectionName);
    const result = await collection.insertOne(newRecord);
    console.log(`Inserted record with ID: ${result.insertedId}`);
    return result.insertedId;
  } catch (error) {
    console.error("Error inserting record:", error);
    throw error;
  }
}

async function updateRecord(recordId, updatedData, collectionName) {
  try {
    const db = client.db();
    const collection = db.collection(collectionName);
    const filter = { id: recordId };
    const updateDoc = { $set: updatedData };
    const result = await collection.updateOne(filter, updateDoc);
    console.log(`Updated record with ID: ${recordId}`);
    return result.modifiedCount > 0;
  } catch (error) {
    console.error("Error updating record:", error);
    throw error;
  }
}

async function findRecordById(recordId, collectionName) {
  try {
    const db = client.db();
    const collection = db.collection(collectionName);
    const result = await collection.findOne({ id: recordId });
    return result;
  } catch (error) {
    console.error("Error finding record by ID:", error);
    throw error;
  }
}

async function findRecordByemail(recordId, collectionName) {
  try {
    const db = client.db();
    const collection = db.collection(collectionName);
    const result = await collection.findOne({ email: recordId });
    return result;
  } catch (error) {
    console.error("Error finding record by ID:", error);
    throw error;
  }
}

async function findRecordByapplogin(recordId, collectionName) {
  try {
    const db = client.db();
    const collection = db.collection(collectionName);
    const result = await collection.findOne(
      {
        $and: [{ email: recordId.email }, { password: recordId.password }],
      },
      collectionName
    );
    return result;
  } catch (error) {
    console.error("Error finding record by ID:", error);
    throw error;
  }
}
async function deleteRecordById(recordId, collectionName) {
  try {
    const db = client.db();
    const collection = db.collection(collectionName);
    const result = await collection.deleteOne({ id: recordId });
    console.log(`Deleted record with ID: ${recordId}`);
    return result.deletedCount > 0;
  } catch (error) {
    console.error("Error deleting record by ID:", error);
    throw error;
  }
}

async function getAllData(collectionName) {
  try {
    const db = client.db();
    const collection = db.collection(collectionName);
    const result = await collection.find().toArray();
    return result;
  } catch (error) {
    console.error("Error fetching all data:", error);
    throw error;
  }
}

async function closeMongoConnection() {
  await client.close();
  console.log("Closed MongoDB connection");
}

module.exports = {
  connectToMongo,
  insertRecord,
  updateRecord,
  findRecordById,
  deleteRecordById,
  getAllData,
  findRecordByapplogin,
  closeMongoConnection,
  findRecordByemail,
};
