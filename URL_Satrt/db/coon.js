const mongoose=require("mongoose")

const DB = "mongodb+srv://jugal786:jugal786@cluster0.sgg8t.mongodb.net/ones?retryWrites=true&w=majority";

// Create a new error handler function
const errorHandler = (err) => {
    // Log the error to the console
    console.error(err);
  
    // Check if the error is a connection error
    if (err.code === mongoose.Error.CONNECTION_FAILED) {
      // Retry the connection after 5 seconds
      setTimeout(() => {
        mongoose.connect(DB, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        });
      }, 5000);
    } else {
      // Throw the error
      throw err;
    }
  };
  
  // Add the error handler to the connection promise
  mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log("connect");
  }).catch(errorHandler);