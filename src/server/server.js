// Setup empty JS object to act as endpoint for all routes
projectData = {};
// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();
/*Dependencies*/

const bodyParser = require("body-parser");
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
//Node-fetch not working, used: https://stackoverflow.com/questions/69055506/how-to-fix-must-use-import-to-load-es-module-discord-js
const fetch = (...args) =>
    import ('node-fetch').then(({ default: fetch }) => fetch(...args));
// Initialize the main project folder
app.use(express.static("dist"));


// Setup Server
const port = 1111;
const server = app.listen(port, listening);

function listening() {
  console.log("Yay! The server is running!");
  console.log(`Running on localhost: ${port}`);
}


app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
  }); 
  
//Global Variables
const api_key_one = "ornemoon";
const api_key_two = "b1f33692e9d44e2787bc3410957ac1ee";
const api_key_three = "26085637-82271d523132340b46a70b7f0";

//Api Data and post route
app.post('/allData', getApiData);

async function getApiData(req, res){
    let country = req.body.countryInput
    let city = req.body.cityInput
    let startDate = new Date(req.body.Start);
    let endDate = new Date(req.body.End);

    //Date function taken from project Weather Journal App https://github.com/ornevirardi/weather_journal_app/blob/main/website/app.js , Get today's date: https://www.codegrepper.com/code-examples/javascript/how+to+get+today+date+in+javascript and https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript
    let tripDates = endDate.getTime() - startDate.getTime();
    let tripDuration = `Your trip is ${tripDates/ (1000 * 60 * 60 *24)} days`;

    let today = new Date();  
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); 
    let yyyy = today.getFullYear();
    today = new Date(mm + '/' + dd + '/' + yyyy); 
    console.log(today);
    console.log(startDate);
    let timeDiff = startDate.getTime() - today.getTime();
    console.log(timeDiff)
    let daysDiff = `${timeDiff / (1000 * 60 * 60 *24)} days`;
    console.log(daysDiff);

    //geoData - 
    let geoData ={};
    const getGeoData = async(key) => {
        const geo_response = await fetch((`http://api.geonames.org/searchJSON?q=${city}&maxRows=10&username=${api_key_one}`), { method: 'GET' })
        try {
            const geo_data_json = await geo_response.json();
            console.log(geo_data_json);
            geoData = {
                lng: geo_data_json.geonames[0].lng,
                lat: geo_data_json.geonames[0].lat,
            }
            console.log(geoData);
        } catch (error) {
            console.log("There has been an error fetching GeoData information ", error);
        }
    }
    await getGeoData(city);

     `http://api.weatherbit.io/v2.0/forecast/daily?lat=${geoData.lat}&lon=${geoData.lng}&key=${api_key_two}&units=M`

    //WeatherBit
    let weatherData ={};
    const getWeatherData = async() => {
        const weather_response = await fetch(`http://api.weatherbit.io/v2.0/forecast/daily?lat=${geoData.lat}&lon=${geoData.lng}&key=${api_key_two}&units=M`)
        try {
            const weather_data_json = await weather_response.json();
            console.log(weather_data_json);
            weatherData ={
                temp: weather_data_json.data[0].temp,
                weather: weather_data_json.data[0].description,
                maxTemp: weather_data_json.data[0].max_temp,
                minTemp: weather_data_json.data[0].min_temp ,
                precip: weather_data_json.data[0].precip,
            }}catch (error) {
            console.log("There has been an error fetching WeatherBit information ", error);
        }}
        await getWeatherData();

    //Pixabay

    let foto ={}
    const getPictureData = async()=>{ 
        const pix_response = await fetch (`https://pixabay.com/api/?key=${api_key_three}&q=${city}&image_type=photo&pretty=true`);
        try {
            const pix_data = await pix_response.json();
            console.log(pix_data);
            pic_pic = pix_data.hits[0].webformatURL;
            foto = {
                fotoCity: pic_pic,
            }}catch (error) {
                console.log("There has been an error fetching WeatherBit information ", error);
            }}
            // document.getElementById('imagen').setAttribute('src', pic_pic );
    await getPictureData();
    //Gather all info in proectData obj
    projectData ={
        daysDiff: daysDiff,
        tripDuration: tripDuration,
        temp: weatherData.temp,
        maxTemp: weatherData.maxTemp,
        minTemp: weatherData.minTemp,
        precip: weatherData.precip,
        pais: country,
        ciudad: city,
        foto: foto.fotoCity
    }
    res.send(projectData)
    console.log(`After fetching the data: ${projectData}`);
};


app.get('/allData', (request, response)=>{
    response.send(projectData);
})


module.exports = app;
