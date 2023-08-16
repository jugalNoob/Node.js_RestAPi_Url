//AuthenticationTione Patterns
//1 ::  status full 
//:which maintains state or data or server side -->
 /// import jwt is authenticatiion 

 
///...state
// number:24 auth jlkhjdcsjlhdjs
//number:23 auth jnnjdjn,dcsd
//number: 26 : auth xkbjjxhxnjk

//....statefull 

/// client  username / password >> server 
//<< seccion uid server

//cookies  -- > respone --> header 

//2::stateless
//:which  has no state --> 
const express = require("express");

const app=express()

const port=9000;

app.get("/",(req,res)=>{
res.send("jugal sharma")
})

app.listen(port , ()=>{
    console.log(port)
})


///Authoriztion in node.js //!SECTION  //ANCHOR - 



