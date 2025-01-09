const express = require('express');
const Request = require('../models/Request');
// const nodemailer = require('nodemailer');
const router = express.Router();
const path = require('path');

// const createTransporter = () => {
//   return nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });
// };

// // Function to send confirmation emails
// const sendConfirmationEmails = async (userEmail, request) => {
//   const transporter = createTransporter();

//   const userMailOptions = {
//     from: '"Koyocco Ghana Team" <no-reply@app.com>',
//     to: userEmail,
//     subject: 'Your Request for Airport Pickup Has Been Received',
//     html: `
//       <div style="text-align: center;">
//         <h2>Hello ${request.userName},</h2>
//         <p>Thank you for your request. Your request for an airport pickup service has been successfully received.</p>
//         <p><strong>Vehicle:</strong> ${request.vehicleId.name}</p>
//         <p><strong>Location:</strong> ${request.location}</p>
//         <p><strong>Service Type:</strong> ${request.serviceType}</p>
//         <p><strong>Date:</strong> ${new Date(request.date).toLocaleString()}</p>
//         <p>We will be in touch with you shortly regarding the details of your pickup. Thank you for choosing us!</p>
//         <p>Best regards,<br>Koyocco Ghana Team</p>
//       </div>
//     `,
//   };

//   try {
//     // Send email to the user
//     await transporter.sendMail(userMailOptions);
//     console.log('Emails sent successfully');
//   } catch (error) {
//     console.error('Error sending emails:', error);
//   }
// };

// --POST request to create a new service request
router.post('/create', async (req, res) => {
  try {
    const { userName, phone, serviceType, details, vehicleId, date, location } = req.body;

    if (!userName || !phone || !serviceType || !details || !date || !location) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const newRequest = new Request({
      userName,
      phone,
      serviceType,
      details,
      vehicleId,
      date,
      location,
    });

    // const savedRequest = await newRequest.save();

    // await sendConfirmationEmails(savedRequest);

    res.status(201).json({ success: true, data: savedRequest });
  } catch (err) {
    console.error('Error creating request:', err);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
});

// GET request to fetch all requests
router.get('/', async (req, res) => {
  try {
    const requests = await Request.find().populate('vehicleId');
    res.status(200).json(requests);
  } catch (error) {
    console.error('Error fetching requests:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

module.exports = router;
