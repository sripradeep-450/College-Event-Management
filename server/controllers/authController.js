const Student = require("../models/Student");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerStudent = async (req, res) => {
  try {
    const {
      name,
      registerNumber,
      department,
      year,
      email,
      password,
    } = req.body;

    const existingStudent = await Student.findOne({
      email,
    });

    if (existingStudent) {
      return res.status(400).json({
        message: "Student already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const student = await Student.create({
      name,
      registerNumber,
      department,
      year,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Student Registered Successfully",
      student,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    const student = await Student.findOne({
      email,
    });

    if (!student) {
      return res.status(400).json({
        message: "Student Not Found",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      student.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Password",
      });
    }

    const token = jwt.sign(
      {
        id: student._id,
        role: student.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      message: "Login Successful",
      token,
      student,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};