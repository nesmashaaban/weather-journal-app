
/* Global Variables */
const baseURL = 'https://openweathermap.org/data/2.5/weather?zip=';
const apiKey = ',us&units=metric&appid=a1d3dea9c4e32c430d894b8973e55368';

////start updated data
let Temprature = document.getElementById('temp');
let Date = document.getElementById('date');
let Feeling = document.getElementById('content');
/////End of updated data


let button = document.getElementById('generate');
//button listner
button.addEventListener('click', collectData);

/*
*end of Clobal variable
*/
///////////////////////////////////////////////////////////////////////////////////////////
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1 + '.' +  d.getDate() + '.' + d.getFullYear();

///////////////////////////////////////////////////////////////////////////////////////////////////

// main function
collectData()
{   
    let Feeling = document.getElementById('feelings').value;
    let zipCode = document.getElementById('zip').value;
    if(zipCode == '')
        {
            alert("Enter Zip Code.");
        }
    else
        {
            getWeather(baseURL,zipCode,apiKey) //the retrieved weather

            //posting all data on my page
            .then(function(data){
                postData('/allData/', {Date: newDate , main: data.main.temp , Feeling: Feeling});
            })

            //updating the page
            .then(function()=>{
                updatePage();
        });
        
}

//collect data from external Api
const getWeather = async function(baseURL,zipCode,apiKey)
{
    const result = await fetch(baseURL+zipCode+apiKey);
    try
        {
            const retrievedData = await result.json();
            return retrievedData;
        }
    catch(error)
        {
            console.log(`Error: ${error}`);
        }
}

//function to post all data into server
const postData = async function(url = '', data = {}){
    const response = await fetch(url, {
        method: 'post',
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
};

////Update the page with new data
const updatePage = async ()=>{
    const newUpdatedData = await fetch('/allData'/);
    try{
        const allData = await newUpdatedData.json();
        document.getElementById('date').innerHTML = allData.Date;
        document.getElementById('temp').innerHTML = allData.Temprature;
        document.getElementById('content').innerHTML =allData.Feeling
    }
    catch(error)
        {
            console.log(`Error: ${error}`);
        }
}
