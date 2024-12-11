const mongoose  = require('mongoose')

const mongoDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "Koyoco-DB", 
    });

    console.log("Database Connected");
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
    process.exit(1); 
  }
};


module.exports = mongoDb;
