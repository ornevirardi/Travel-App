//Here goes the even listener, the imports, exports, etc

import { getApiData } from "./js/app";
import { updateUI } from "./js/app";

import './styles/base.scss'

export {getApiData}
export {updateUI}

//Event listener to get things done taken from my project Weather Journal App: https://github.com/ornevirardi/weather_journal_app/blob/main/website/app.js

document.getElementById('generate').addEventListener('button', performAction);

function performAction (e){
    const country = document.getElementById("countryInput").value
    const city = document.getElementById("cityInput").value
    const dates = document.getElementById("fecha").value
    getApiData('/apiData', {
        Country: country,
        City: city,
        Dates: dates,
    })
    .then (()=>{updateUI();});
};

