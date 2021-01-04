
/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = ',us&units=metric&appid=13d459045bdf5f5d9f9ef260cd96c393';
//https://api.openweathermap.org/data/2.5/weather?zip=10001,us&units=metric&appid=13d459045bdf5f5d9f9ef260cd96c393

let tempratureDiv = document.getElementById('temp');
let feelingDiv = document.getElementById('content');
let dateDiv = document.getElementById('date');
let button = document.getElementById('generate');
/*
*end of Clobal variable
*/

//button listner
button.addEventListener('click', collectData);


///////////////////////////////////////////////////////////////////////////////////////////////////

// main function
function collectData(Data)
{   
    console.log("This function that collect data is working.");
    
        // Create a new date instance dynamically with JS
    let d = new Date();
    let newDate = d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
    console.log(`Today is: ${newDate}`);

    let Feeling = document.getElementById('feelings').value;
    let zipCode = document.getElementById('zip').value;
    if(zipCode == '' & Feeling == '')
        {
            alert("Please Fill in the text areas below.");
        }
    else
        {
            let URL = `${baseURL}${zipCode}${apiKey}`;
            console.log(`Your Feeling ${Feeling}`);
            console.log(`Zip Code is ${zipCode}`);
            console.log(`URL is ${URL}`);
            
            //getWeather('/temp')
            getWeather(URL)
            
            .then(function(data){
                
                console.log(`"printed out from collectData Function" Posted Data On Server are {Date:${newDate} , Temprature: ${data}, Feeling:${Feeling}}`);
                
                postData('/addDataOnServer', {Date:newDate , Temprature:data, Feeling:Feeling})
            
            .then(()=>{
                updatePage('/retrieveData');
        })
            })
        }
}

//collect data from external Api
//const getWeather = async function(url){
const getWeather = async function(url){
    const result = await fetch(url);
    try
        {
            const retrievedData = await result.json();
            const retrievedTemp = retrievedData.main.temp;
            console.log(`Retrieved Temprature from API = ${retrievedTemp}`);
            return retrievedTemp;
        }
    catch(error)
        {
            console.log(`Error: ${error}`);
        }
}

//function to post all data into server
const postData = async function(url ='', data = {}){
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers:{
            'content-type': 'application/json',
        },
        body: JSON.stringify(data),
});
    
    try
        {         
            const newData = response.json();
            return newData;   
        }
    catch(error)
        {
            console.log(`Error: ${error}`);
        }
}

////Update the page with new data
const updatePage = async (url='')=>{
    const newUpdatedData = await fetch(url);
    try
    {
        const allData = await newUpdatedData.json();
       
        dateDiv.innerHTML = `Today is: ${allData.Date}`;
        tempratureDiv.innerHTML = `Temprature is: ${allData.Temprature}`;
        feelingDiv.innerHTML =`You're Feeling: ${allData.Feeling} Today.`;
        
    }
    catch(error)
    {
        console.log(`Error: ${error}`);
    }
};