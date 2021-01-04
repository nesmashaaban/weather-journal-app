

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
app.post('/addDataOnServer', postData);

function postData(request, response)
{
    let result = request.body;
    projectData = {
        Date: result.Date,
        Temprature: result.Temprature,
        Feeling: result.Feeling
    }
    response.send(projectData);
    
    console.log(` "Printed out From the server" Posted Data On Server are Date:${projectData.Date} , Temprature: ${projectData.Temprature}, Feeling:${projectData.Feeling}}`);
}



//get all data from the object endpoint 
app.get('/retrieveData', getData);

function getData(request, response)
{
    response.send(projectData);
};

//fake api

app.get('/temp', getTemp);
function getTemp(req, res)
{
    let objectData = {
        main: {
            temp: `20`
        }
    };
    res.send(objectData);
};
