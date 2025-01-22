const jwt = require('jsonwebtoken');


const generateToken = (agent) => {
  const payload = {
    id: agent._id, 
    role: 'agent',
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
  return token;
};

module.exports = generateToken;
