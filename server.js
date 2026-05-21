const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const Student = require("./models/Student");

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

//CREATE STUDENT
app.post("/students", async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (err) {
    res.status(500).json({
      message: er.message,
    });
  }
});

//GET ALL STUDENTS
app.get("/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

//SEARCH STUDENT
app.get("/students/search/:name", async (req, res) => {
  try {
    const student = await Student.find({
      name: req.params.name,
    });
    res.status(200).json(student);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

//UPDATE STUDENT
app.patch("/students/:id", async (req, res) => {
  try {
    const updatedStudent = await Student.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true },
    );
    res.status(200).json(updatedStudent);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

//DELETE STUDENT
app.delete("/students/:id", async (req, res) => {
  try {
    await Student.findOneAndDelete({
      id: req.params.id,
    });
    res.status(200).json({
      message: "Student Deleted Successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT}`);
});
