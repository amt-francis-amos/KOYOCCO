const User = require('../models/User');

const getDashboardData = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    return res.json({ totalUsers });
  } catch (error) {
    console.error('Error fetching data:', error);
    return res.status(500).json({ success: false, message: 'Error fetching data' });
  }
};

module.exports = { getDashboardData };
