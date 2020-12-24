

// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

const bodyParser = require('body-parser');
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

/////////////////////////////////////////////////////////////////////////////////////////////
// Setup Server
const port = 3000;

const server = app.listen(port, listining);

//callback function
function listining()
{
    console.log('server running');
    console.log(`running on localhost: ${port}`);
}

//////////////////////////////////////////////////////////////////////////////////////////////


//Post all data into the local server
app.post('/allData/', postData);

function postData(request, response)
{
    let result = request.body;
    projectData = {
        Temprature: result.main.Temprature,
        Date: result.Date,
        Feeling: result.Feeling
    }
    response.send(projectData);
}



//get all data from the object endpoint 
app.get('/allData/', getData);

function getData(request, response)
{
    response.send(projectData);
};
