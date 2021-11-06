/* Global Variables */

// Set the base URL.
const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";

// Set the API key.
const apiKey = "&appid=e07b480331246612968148dd2117cc53";

// Create a new date instance dynamically with JS in the format mm.dd.yy .
let d = new Date();
let newDate = (d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear();

/* Functions */
// GET route
/**
 * Make a GET request to the OpenWeatherMap API to fetch the data from the app endpoint.
 */
const getAppData = async (url, zip, api) => { 
        try{
            const req = await fetch(url+zip+api);
            const allData = await req.json();
            return allData;
        } catch (err){
            alert(err);
        }
    }

// POST route
/**
 * Make a POST request to add the API data, as well as data entered by the user, to the app.
 */
const postData = async (url='', data={}) => {
    const res = await fetch(url,{
        method: 'POST',
        credentials: 'same-origin',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
    });
    try{
        const newData = await res.json();
        return newData;
    } catch(err){
        alert(err);
    }
}

// updateUI() function
/**
 * This function updates the UI with new data temperature, date and user feelings.
 */
const updateUI = async(url='') =>{
    const req = await fetch(url);
    try{
        const allData = await req.json();
        // Update DOM elements dynamically according to data returned by the app route.        
        document.getElementById("temp").innerHTML = allData.temperature;
        document.getElementById("date").innerHTML = allData.date;
        document.getElementById("content").innerHTML = allData.userResponse;
    } catch (err){
        alert(err);
    }
}

/**
 * This function gets data from weather API, posts it to the server, and finally displays it in the client app.
 * @param {*} zCode Zip code of the country to get its temperature
 * @param {*} feel Feelings content which is entered by the user
 */
function doWork(zCode, feel){
    getAppData(baseURL, zCode, apiKey)
    .then(function(data){
        // Call the async POST request
        postData('/weather', {temp:data.main.temp, date:newDate, userRes:feel});
        // Update UI
        updateUI('/weather')
    })
}

/* Event Listener*/
/**
 * Add event listener to the button "Generate".
 */
document.getElementById("generate").addEventListener("click", function (){    
    
    // 1 - Get the ZIP code to search about its corresponding weather.
     let zipCode = document.getElementById("zip").value;

    // 2 - Get feelings from textarea
     let feelings = document.getElementById("feelings").value;

    // 3 - Check if the ZIP code and feelig content are entered right.
    if (zipCode === ""){ // invalid Zip Code
        alert(`Empty Zip code is not allowed.\nPlease, enter a valid one.`);
    } else if (feelings === ""){ // invalid content
        alert("Please, enter your feelings.");
    } else{
        // 4 - Get data from the ewather API and display it.
        doWork(zipCode, feelings);
    }
});

