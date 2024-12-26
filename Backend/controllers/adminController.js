const User = require('../models/User'); 

const getDashboardData = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    res.json({ totalUsers });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data' });
  }
};

module.exports = { getDashboardData };