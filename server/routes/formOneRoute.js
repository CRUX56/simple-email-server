// heroFormRoute.js
require("dotenv").config(); // Load enviorment variables from .env

const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const emailService = process.env.EMAIL_SERVICE || "Gmail";
const emailUser = process.env.EMAIL_USER || "dathan.cruz4@gmail.com";
const emailPass = process.env.EMAIL_PASSWORD || "ipszvzedligdrtwg";

// Route handler for the hero form
router.post("/", async (req, res) => {
  // Handle Hero form submission here
  const { name, email } = req.body;

  try {
    // Create Nodemailer transporter
    let transporter = nodemailer.createTransport({
      service: emailService,
      auth: {
        user: emailUser, // your email address
        pass: emailPass, // your email pass,
      },
    });

    // Define the email option
    let mailOptions = {
      from: "dathan.cruz4@gmail.com", // your-email@gmail.com
      to: "dathan.cruz4@gmail.com", // recipient-email@example.com
      subject: "Free HVAC Quote Submission",
      text: `Name: ${name}\nEmail: ${email}`,
    };

    // Send the email

    await transporter.sendMail(mailOptions);

    res.json({
      message: "Free HVAC Quote data received and email sent successfully",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Error sending email" });
  }
});

/* Example to post to console
router.post("/", (req, res) => {
  // Handle form data here
  const formData = req.body;
  console.log("Hero Form data received:", formData);

  // Send a response back to the frontend
  res.json({ message: "Hero Form data received successfully!" });
});*/

module.exports = router;
