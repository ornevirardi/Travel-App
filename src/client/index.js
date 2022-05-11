//Here goes the even listener, the imports, exports, etc

import { getApiData } from "./js/app";
import { updateUI } from "./js/app";
import './styles/base.scss'

export {getApiData}
export {updateUI}

//Event listener to get things done taken from my project Weather Journal App: https://github.com/ornevirardi/weather_journal_app/blob/main/website/app.js

document.getElementById('button').addEventListener('click', performAction);

function performAction (e){
    const country = document.getElementById("countryInput").value
    console.log(country);
    const city = document.getElementById("cityInput").value
    console.log(city);
    const startDate = document.getElementById('startDate').value;
    console.log(startDate);
    const endDate = document.getElementById('endDate').value;
    console.log(endDate);
    e.preventDefault();
    getApiData('http://localhost:1111/allData', {
        Country: country,
        City: city,
        Start: startDate,
        End: endDate,
    })
    .then(()=>{updateUI();});
};

