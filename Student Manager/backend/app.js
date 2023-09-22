const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoFunctions = require("./mongo");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(bodyParser.json());

app.post("/api/insert", async (req, res) => {
  const { id, name, gender, year, gpa } = req.body;
  const newRecord = { id, name, gender, year, gpa };

  try {
    await mongoFunctions.connectToMongo();

    const existingRecord = await mongoFunctions.findRecordById(id, "stud_data");

    if (existingRecord) {
      res.json({ success: true, message: "ID already exists", id });
    } else {
      await mongoFunctions.insertRecord(newRecord, "stud_data");
      res.json({ success: true, message: "Record inserted successfully", id });
    }
  } catch (error) {
    console.error("Error inserting or checking record:", error);
    res
      .status(500)
      .json({ success: false, message: "Error inserting or checking record" });
  } finally {
    await mongoFunctions.closeMongoConnection();
  }
});

app.post("/api/newuser", async (req, res) => {
  const { email, password } = req.body;
  const newRecord = { email, password };

  try {
    await mongoFunctions.connectToMongo();
    const existingRecord = await mongoFunctions.findRecordByemail(
      email,
      "USER_LOGINS"
    );

    if (existingRecord) {
      res.json({ success: true, message: "ID already exists", email });
    } else {
      await mongoFunctions.insertRecord(newRecord, "USER_LOGINS");
      res.json({ success: true, message: "Record inserted successfully", id });
    }
  } catch (error) {
    console.error("Error inserting or checking record:", error);
    res
      .status(500)
      .json({ success: false, message: "Error inserting or checking record" });
  } finally {
    await mongoFunctions.closeMongoConnection();
  }
});

app.put("/api/update", async (req, res) => {
  const { id, name, gender, year, gpa } = req.body;

  try {
    await mongoFunctions.connectToMongo();

    const success = await mongoFunctions.updateRecord(
      id,
      { name, gender, year, gpa },
      "stud_data"
    );

    if (success) {
      res.json({ success: true, message: "Record updated successfully" });
    } else {
      res.status(404).json({ success: false, message: "Record not found" });
    }
  } catch (error) {
    console.error("Error updating record:", error);
    res.status(500).json({ success: false, message: "Error updating record" });
  } finally {
    await mongoFunctions.closeMongoConnection();
  }
});

app.post("/api/find", async (req, res) => {
  const { id } = req.body;

  try {
    await mongoFunctions.connectToMongo();

    const record = await mongoFunctions.findRecordById(id, "stud_data");

    if (record) {
      res.json({ success: true, record });
    } else {
      res.status(404).json({ success: false, message: "Record not found" });
    }
  } catch (error) {
    console.error("Error finding record by ID:", error);
    res
      .status(500)
      .json({ success: false, message: "Error finding record by ID" });
  } finally {
    await mongoFunctions.closeMongoConnection();
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    await mongoFunctions.connectToMongo();

    const record = await mongoFunctions.findRecordByapplogin(
      req.body,
      "USER_LOGINS"
    );

    if (record) {
      res.json({ success: true, record });
    } else {
      res.status(404).json({ success: false, message: "Record not found" });
    }
  } catch (error) {
    console.error("Error finding record by email:", error);
    res
      .status(500)
      .json({ success: false, message: "Error finding record by email" });
  } finally {
    await mongoFunctions.closeMongoConnection();
  }
});

app.post("/api/getdata", async (req, res) => {
  try {
    await mongoFunctions.connectToMongo();

    const data = await mongoFunctions.getAllData("stud_data");

    res.json({ success: true, data });
  } catch (error) {
    console.error("Error fetching all data:", error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching all data" });
  } finally {
    await mongoFunctions.closeMongoConnection();
  }
});

app.delete("/api/delete", async (req, res) => {
  const { id } = req.body;

  try {
    await mongoFunctions.connectToMongo();
    const success = await mongoFunctions.deleteRecordById(id, "stud_data");

    if (success) {
      res.json({ success: true, message: "Record deleted successfully" });
    } else {
      res.status(404).json({ success: false, message: "Record not found" });
    }
  } catch (error) {
    console.error("Error deleting record by ID:", error);
    res
      .status(500)
      .json({ success: false, message: "Error deleting record by ID" });
  } finally {
    await mongoFunctions.closeMongoConnection();
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
