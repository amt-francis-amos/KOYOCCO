const express = require('express');
const Request = require('../models/Request');
const nodemailer = require('nodemailer');
const router = express.Router();
const path = require('path');


const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};


const sendConfirmationEmails = async (userEmail, agentEmail, request) => {
  const transporter = createTransporter();

  const userMailOptions = {
    from: '"Koyocco Ghana Team" <no-reply@app.com>',
    to: userEmail,
    subject: 'Your Request for Airport Pickup Has Been Received',
    html: `
      <div style="text-align: center;">
        <h2>Hello ${request.userName},</h2>
        <p>Thank you for your request. Your request for an airport pickup service has been successfully received.</p>
        <p><strong>Vehicle:</strong> ${request.vehicleId.name}</p>
        <p><strong>Location:</strong> ${request.location}</p>
        <p><strong>Service Type:</strong> ${request.serviceType}</p>
        <p><strong>Date:</strong> ${new Date(request.date).toLocaleString()}</p>
        <p>We will be in touch with you shortly regarding the details of your pickup. Thank you for choosing us!</p>
        <p>Best regards,<br>Koyocco Ghana Team</p>
      </div>
    `,
  };

  const agentMailOptions = {
    from: '"Koyocco Ghana Team" <no-reply@app.com>',
    to: agentEmail,
    subject: 'New Airport Pickup Request',
    html: `
      <div style="text-align: center;">
      <img src="cid:logo" style="width: 150px;" alt="Koyocco Ghana Logo" />
        <h2>New Airport Pickup Request</h2>
        <p>A new request for airport pickup has been received from ${request.userName}.</p>
        <p><strong>Vehicle:</strong> ${request.vehicleId.name}</p>
        <p><strong>Location:</strong> ${request.location}</p>
        <p><strong>Service Type:</strong> ${request.serviceType}</p>
        <p><strong>Date:</strong> ${new Date(request.date).toLocaleString()}</p>
        <p>Please review and confirm the request.</p>
        <p>Best regards,<br>Koyocco Ghana Team</p>
      </div>
    `,
  };

  try {
    // Send email to the user
    await transporter.sendMail(userMailOptions);

    // Send email to the agent
    await transporter.sendMail(agentMailOptions);

    console.log('Emails sent successfully');
  } catch (error) {
    console.error('Error sending emails:', error);
  }
};


router.post('/create', async (req, res) => {
  try {
    const { userName, userEmail, phone, serviceType, details, vehicleId, date, location, agentEmail } = req.body;

   
    if (!userName || !userEmail || !phone || !serviceType || !details || !date || !location || !agentEmail) {
      return res.status(400).json({ error: 'All fields, including agentEmail, are required.' });
    }


    const newRequest = new Request({
      userName,
      userEmail,
      phone,
      serviceType,
      details,
      vehicleId,
      date,
      location,
      agentEmail, 
    });

    const savedRequest = await newRequest.save();


    await sendConfirmationEmails(userEmail, agentEmail, savedRequest);

    res.status(201).json({ success: true, data: savedRequest });
  } catch (err) {
    console.error('Error creating request:', err);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
});


router.post('/send-emails', async (req, res) => {
  const { userEmail, agentEmail, userName, serviceType, vehicleId, date, location } = req.body;

  if (!userEmail || !agentEmail || !userName || !serviceType || !vehicleId || !date || !location) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  try {
  
    const transporter = createTransporter();

    const userMailOptions = {
      from: '"Koyocco Ghana Team" <no-reply@app.com>',
      to: userEmail,
      subject: 'Your Request for Airport Pickup Has Been Received',
      html: `
        <div style="text-align: center;">
          <h2>Hello ${userName},</h2>
          <p>Thank you for your request. Your request for an airport pickup service has been successfully received.</p>
          <p><strong>Vehicle:</strong> ${vehicleId}</p>
          <p><strong>Location:</strong> ${location}</p>
          <p><strong>Service Type:</strong> ${serviceType}</p>
          <p><strong>Date:</strong> ${new Date(date).toLocaleString()}</p>
          <p>We will be in touch with you shortly regarding the details of your pickup. Thank you for choosing us!</p>
          <p>Best regards,<br>Koyocco Ghana Team</p>
        </div>
      `,
    };

    const agentMailOptions = {
      from: '"Koyocco Ghana Team" <no-reply@app.com>',
      to: agentEmail,
      subject: 'New Airport Pickup Request',
      html: `
        <div style="text-align: center;">
          <h2>New Airport Pickup Request</h2>
          <p>A new request for airport pickup has been received from ${userName}.</p>
          <p><strong>Vehicle:</strong> ${vehicleId}</p>
          <p><strong>Location:</strong> ${location}</p>
          <p><strong>Service Type:</strong> ${serviceType}</p>
          <p><strong>Date:</strong> ${new Date(date).toLocaleString()}</p>
          <p>Please review and confirm the request.</p>
          <p>Best regards,<br>Koyocco Ghana Team</p>
        </div>
      `,
    };

 
    await transporter.sendMail(userMailOptions);
    await transporter.sendMail(agentMailOptions);

    res.status(200).json({ message: 'Emails sent successfully' });
  } catch (error) {
    console.error('Error sending emails:', error);
    res.status(500).json({ message: 'Error sending emails' });
  }
});


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
