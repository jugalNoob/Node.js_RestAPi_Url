const mongoose=require("mongoose");
var bcrypt = require('bcryptjs');

// const keysecret=process.env.SECRETY_KEY;

const Students=new mongoose.Schema({
   
    
   name: { type: String, lowercase: true, trim: true },

   classs:{type:String,Number ,required: true 
    },
   roll_no:{type:String,Number,  required: true    
    },

   gender:{type:String , required: true },

    subject:{type:String,required: true
    },
    date: {
        type: Date,
        default: Date.now ,// Default value for date
        required: true
      },
      //  //timestamps: true ,
})


///FIXME - Models //SECTION - 

const Register = new mongoose.model("Users", Students,)
    // Error handler function
  module.exports = Register;


 