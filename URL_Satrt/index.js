const express = require("express");
const cluster = require("cluster");
const os = require("os");
const URL=require("./models/url")
require("./db/coon")
const {handleGenerateNewShortURL}=require("./controlles/url")
const totalCPUs = os.cpus().length;

if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`);
    for (let i = 0; i < totalCPUs; i++) {
       let worker = cluster.fork();
       worker.send('hi there'); // Sending a message to the worker
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
        if (signal) {
            console.log(`Worker was killed by signal: ${signal}`);
        } else if (code !== 0) {
            console.log(`Worker exited with error code: ${code}`);
        } else {
            console.log('Worker success!');
        }
    });

    cluster.on('disconnect', (worker) => {
        console.log(`The worker #${worker.id} has disconnected`);
    });
} else {
    // Listen for messages from the parent process
    process.on('message', (message) => {
        console.log(`Worker ${process.pid} received message: ${message}`);
    });

    const app = express();
    const port = 8000;
    app.use(express.json());
    app.get("/", (req, res) => {
        console.log(`Request received on worker ${process.pid}`);
        res.json({ message: `Hello, this is the response from the server. Worker ${process.pid}` });
    });

    //URL Shorts /// Sort // start //!SECTION

app.post("/urls" , handleGenerateNewShortURL)


///Get Sort LINE start row class 

//http://localhost:8000/BkDQy0TMn
app.get("/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
      {
        shortId,
      },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      }
    );

    console.log(entry)
    res.redirect(entry.redirectURL);
  });
  

  //Get Short Id analytices //////////!SECTION
// /http://localhost:8000/analytics/BkDQy0TMn
  app.get("/analytics/:shortId" , async(req,res)=>{
    try {
     
        const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
    } catch (errors) {
        res.status(404).json({error:"/analytics/:shortId"})
        console.log(errors)
    }
  })
  

  ///REVIEW - //////////////

app.listen(port, () => {
        console.log(`Worker ${process.pid} is running on port ${port}`);
    });
}
