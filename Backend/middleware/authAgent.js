const jwt = require('jsonwebtoken');
const User = require('../models/Agent'); // Assuming 'Agent' is your agent model

// Middleware to check if the user is authenticated and extract the agent ID from the token
const authenticateAgent = (req, res, next) => {
    const token = req.header('x-auth-token');  // Assuming token is sent in the request header

    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        // Verify the token and decode the agentId
        const decoded = jwt.verify(token, 'your-secret-key');
        req.agentId = decoded.agentId;  // Store the agent ID in the request
        next();
    } catch (error) {
        return res.status(401).json({ msg: 'Token is not valid' });
    }
};

module.exports = authenticateAgent;
