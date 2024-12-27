const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const nodemailer = require('nodemailer'); 
const path = require('path');
const authenticateToken = require('../middleware/auth.middleware.js');

const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

const sendBookingConfirmationEmail = async (booking) => {
  const transporter = createTransporter();
  const mailOptions = {
    from: '"Koyocco Ghana Team" <no-reply@app.com>',
    to: booking.email,
    subject: "Booking Confirmation",
    html: `
      <div style="text-align: center;">
        <img src="cid:logo" style="width: 100px;" alt="Koyocco Ghana Logo" />
        <h2>Hello ${booking.fullName},</h2>
        <p>Thank you for your booking. Your booking for property ID ${booking.propertyId} has been confirmed.</p>
        <p><strong>User ID:</strong> ${booking.userId}</p>
        <p><strong>Property ID:</strong> ${booking.propertyId}</p>
        <p>We look forward to having you. If you have any questions, feel free to contact us.</p>
        <p>Best regards,<br>Koyocco Ghana Team</p>
      </div>
    `,
    attachments: [
      {
        filename: 'logo.png',
        path: path.join(__dirname, '../public/images/koyocco-logo.jpeg'),
        cid: 'logo',
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Booking confirmation email sent successfully to:', booking.email);
  } catch (error) {
    console.error('Error sending booking confirmation email:', error);
    throw new Error('Could not send booking confirmation email');
  }
};

// Booking route
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { propertyId, fullName, email, date } = req.body;
    const { userId } = req.user;

    if (!propertyId || !fullName || !email || !date) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const existingBooking = await Booking.findOne({ userId, propertyId });
    if (existingBooking) {
      return res.status(409).json({ message: "You already have a booking for this property." });
    }

    const newBooking = new Booking({
      userId,
      propertyId,
      fullName,
      email,
      date,
    });

    await newBooking.save();

    try {
      await sendBookingConfirmationEmail(newBooking);
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
    }

    res.status(201).json({ message: "Booking successful! Confirmation email sent." });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ message: "Error creating booking." });
  }
});

module.exports = router;
