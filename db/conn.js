const mongoose = require('mongoose');
require('dotenv').config(); // If you're using dotenv to manage environment variables

const DB = "mongodb+srv://jugal786:jugal786@cluster0.sgg8t.mongodb.net/ones?retryWrites=true&w=majority"

if (!DB) {
  console.error("Database URL not provided. Please set the DATAS environment variable.");
} else {
  mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log("Connected to the database");
  }).catch((err) => {
    console.error("Error connecting to the database:", err);
  });
}
