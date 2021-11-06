// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 3000;
const server = app.listen(port, function(){
    console.log(`Server running, and app is listenning at http://localhost:${port}`);
});

// GET route
/*A GET route that returns the projectData object in server code. */
app.get('/weather', function getData(req, res){
    res.send(projectData);
    projectData = {};   // Reset projectData object after sending data
});

// POST route
/**
 * The POST route should receive three pieces of data from the request body 
 * temperature, date and user response.
 */
app.post('/weather', function postData(req, res){
    const newEntry = {
        temperature: req.body.temp, 
        date: req.body.date, 
        userResponse: req.body.userRes
    };
    projectData = newEntry;
    res.send(projectData);
})
