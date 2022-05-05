//Make the POST request with a helper function: taken from my project: evaluate news NLP: https://github.com/ornevirardi/NLP-testing/blob/main/src/client/js/formHandler.js

async function getApiData(url, data = {}) {
    const response = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  
    try {
      const newData = await response.JSON();
      console.log(newData);
      return newData;
    } catch (error) {
      console.log("error", error);
    }
  };  

  export {getApiData};

//UpdateUI taken from my project: evaluate news NLP https://github.com/ornevirardi/NLP-testing/blob/main/src/client/js/formHandler.js
  async function updateUI() {
    const request = await fetch('http://localhost:7654/allData'); 
    try {
        const allData = await request.json();
        console.log(allData);
        document.getElementById("temp").innerHTML = `Current Temperature: ${allData.temp}`;
        console.log(allData.temp);
        document.getElementById("maxtemp").innerHTML = `Forecast Max Temperature: ${allData.max_temp}`;
        console.log(allData.max_temp);
        document.getElementById("mintemp").innerHTML = `Forecast Min Temperature: ${allData.min_temp}`;
        console.log(allData.min_temp);
        document.getElementById("precip").innerHTML = `Forecast Precipitations - Rain: ${allData.precip}`;
        console.log(allData.precip);
        document.getElementById('imagen').src = allData.foto;
    } catch (error) {
        console.log("UI data could not be updated", error);
    }
}
export { updateUI };