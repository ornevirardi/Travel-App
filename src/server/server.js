// Setup empty JS object to act as endpoint for all routes
let projectData = {};

const express = require ('express');
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require("cors");
const { response } = require('express');
app.use(cors({origin: '*'}));
app.use(express.static('dist'));
const axios = require('axios');


app.listen(7654, ()=>{
    console.log('Yay your app is running in port 7654')
})

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
  });
  
//Global Variables
const username = "ornemoon";
const api_key_two = "b1f33692e9d44e2787bc3410957ac1ee";
const api_key_three = "26085637-82271d523132340b46a70b7f0";

//Api Data and post route
app.post('/allData', getApiData);

async function getApiData(req, res){
let country = req.body.countryInput
let city = req.body.cityInput
let dates = req.body.fecha

//geoData - Code taken from answer in Knowledge: https://knowledge.udacity.com/questions/248560
let geoData ={};

const getDataFromGeoNames= async (username,city)=>{
    const url=`http://api.geonames.org/searchJSON?q=${city}&maxRows=1&username=${username}`;
    try{
        return await axios.get(url)
                .then(res=>{
                    return {
                        lat:res.data.geonames[0].lat,
                        lng:res.data.geonames[0].lng
                    }
                });
    } catch(error){
        console.log(error, "There has been an error");
    }
    geoData ={
        lat:res.data.geonames[0].lat,
        lng:res.data.geonames[0].lng
    }
}
//WeatherBit
let weatherData ={};
const weather_response = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${geoData.lat}&lon=${geoData.lng}&key=${api_key_two}`)
const weather_data = await weather_response.json();
console.log(weather_data);
const weather_temp = await fetch(weather_data.temp);
console.log(weather_temp);
const weather_maxtemp = await fetch(weather_data.max_temp);
console.log(weather_maxtemp);
const weather_mintemp = await fetch(weather_data.min_temp);
console.log(weather_mintemp);
const weather_rain = await fetch(weather_data.precip);
console.log(weather_rain);
weatherData ={
    temp: weather_temp,
    maxTemp: weather_maxtemp,
    minTemp: weather_mintemp,
    precip: weather_rain,
}

//Pixabay

let foto ={}
const pix_response = await fetch (`https://pixabay.com/api/?key=${api_key_three}&q=${city}&image_type=photo&pretty=true`);
  const pix_data = await pix_response.json();
  console.log(pix_data);
  pic_pic = await fetch(pix_data.hits[4].webformatURL);
  foto = {
      fotoCity: pic_pic,
  }
  document.getElementById('imagen').setAttribute('src', pic_pic );

//Gather all info in proectData obj
projectData ={
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

app.get('/allData', (request, respose)=>{
    response.send(projectData);
})

module.exports = app;