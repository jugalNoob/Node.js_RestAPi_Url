const express = require("express");
const router = new express.Router();
require('dotenv').config()
const fs=require("fs")



const Register=require("../models/student")

const bcrypt = require('bcryptjs');

///!SECTION Post data ////////FIXME - 
router.post("/Signup", async (req, res) => {
    const { name, classs, roll_no, gender, subject } = req.body;

    if (!name || !classs || !roll_no || !gender || !subject) {
        return res.status(422).json({ error: "Please fill in all fields" });
    }
    try {
        const addData = new Register({
            name: req.body.name,
            classs: req.body.classs,
            roll_no: req.body.roll_no,
            gender: req.body.gender,
            subject: req.body.subject
        });
        const upload = await addData.save();
        console.log(upload);
        fs.appendFile("hash.txt", JSON.stringify({ ...upload }) + "\n", (err) => {
            if (err) {
                console.error("Error appending data to hash.txt:", err);
            } else {
                console.log("Data appended successfully to hash.txt");
            }
        });

        res.status(200).json({ message: "Data uploaded successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to upload data" });
    }
});


//Search all in my ///FIXME - 
router.get("/Post", async(req, res) => {
    try {
        const check=await Register.find({})
        res.send(check)
        // console.log(check)
    } catch (error) {
        console.log(error)
        res.status(401).json({error:"not_good_io"})
    }
})

///Search your information bu id
router.get("/Se/:id", async(req, res) => {
    try {
        const _id=req.params.id;
        const checks=await Register.findById({_id})
        res.send(checks)
    } catch (error) {
        console.log(error)
        res.status(401).json({error:"not_good_io"})
    }
})


//Search param quary //adavance
// http://localhost:9000/Post/?search=jugal
// http://localhost:9000/ost/?search=&iteams=2
router.get("/ost", async (req, res) => {
    const search = req.query.search || "";
    const status = req.query.status || "";
    const query = {
        name: { $regex: search, $options: "i" } // i means case-insensitive
    };
    const items_per = req.query.items || 4;
    console.log("search", query);
    try {
        const count = await Register.countDocuments(query);
        console.log(count);

        const check = await Register.find(query)
            .limit(+items_per);

        const pageCount = Math.ceil(count / items_per);
        console.log(pageCount);

        res.status(200).json({
            pagination: {
                count: pageCount
            },
            data: check // Send the data as part of the response
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});


///Updateing start  email password your information ///.

// router.patch("/Signup/:name", async (req, res) => {
//     try {
//         const allname = req.params.name;
//         const updatedName = req.body.name;
//         const subjectall = req.body.subject;

//         const updatedUser = await Register.findOneAndUpdate(
//             { name: allname }, // Query based on the user's name
//             {name: updatedName,
//             subject: subjectall, // Update multiple properties
//             },
//             { new: true }
//         );
        
//         if (!updatedUser) {
//             return res.status(404).json({ error: "User not found" });
//         }
//         res.send(updatedUser);
//         console.log(updatedUser);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// });


router.patch("/Signup/:name", async (req, res) => {
    try {
        const allname = req.params.name;
        const updatedName = req.body.name;
        const subjectall = req.body.subject;

        const updatedUser = await Register.findOneAndUpdate(
            { name: allname },
            {
                name: updatedName,
                subject: subjectall,
                updatedAt: new Date() // Adding the updatedAt timestamp
            },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }
        
        res.send(updatedUser);
        console.log(updatedUser);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});



  ///Delete Routers///ANCHOR - 
  router.delete("/Dost/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const deletedUser = await Register.findByIdAndDelete(_id); // Use findByIdAndDelete method
        if (!deletedUser) {
            return res.status(404).json({ error: "User not found" });
        }
        res.send(deletedUser);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});


//

module.exports = router;



/// "$2a$12$gRDPITOmTbLkR8E8wBu.hOejICInZySBeZ2QYWsqv20p/6K9CvBTu"