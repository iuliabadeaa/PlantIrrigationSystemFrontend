// import {firebase} from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js';
// import {firebase} from 'https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js';
// import {initializeApp} from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js';
// import {analytics} from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-analytics.js';
// Import the functions you need from the SDKs you need
//  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-analytics.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { getDatabase, ref, set, get, child, onValue  } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAvd9p0Nj025LAdqNjvgdnz6obkq4SZd5U",
  authDomain: "plant-irrigation-system-3700f.firebaseapp.com",
  databaseURL: "https://plant-irrigation-system-3700f-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "plant-irrigation-system-3700f",
  storageBucket: "plant-irrigation-system-3700f.appspot.com",
  messagingSenderId: "707363798504",
  appId: "1:707363798504:web:b12d1af98feb1a452e785d",
  measurementId: "G-B3VC8VHT0J"
};


const app = initializeApp(firebaseConfig);
var db=getDatabase(app)
const dataRefTemperature = ref(db, 'Sensor/air_temperature');
const dataRefHumidity = ref(db, 'Sensor/air_humidity');
const dataRefSoilMoisture = ref(db, 'Sensor/soil_humidity');
const dataRefLightLevel = ref(db, 'Sensor/value_brightness');
const relayRef = ref(db, 'Sensor/relay_state');

let initialState = false

onValue(relayRef, (snapshot) => {
  initialState = snapshot.val()
      if(initialState == false){
        document.getElementById("water-pump").innerText = "Turn OFF"
      }
      else{
        document.getElementById("water-pump").innerText = "Turn ON"
      }

})
onValue(dataRefTemperature, (snapshot) => {
  const air_temperature = snapshot.val();
  updateAirTemperature(air_temperature);
  document.getElementById('temperature').innerHTML = air_temperature + "°C";
});

onValue(dataRefHumidity, (snapshot) => {
  const air_humidity = snapshot.val();
  updateAirHumidity(air_humidity);
  document.getElementById('humidity').innerHTML = air_humidity + "%";
});

onValue(dataRefSoilMoisture, (snapshot) => {
  const soil_humidity = snapshot.val();
  updateSoilLevel(soil_humidity)
  document.getElementById('soil').innerHTML = soil_humidity + "%";
});

onValue(dataRefLightLevel, (snapshot) => {
  const light_level = snapshot.val();
  updateLightLevel(light_level)
  document.getElementById('light').innerHTML = light_level + "%";
});

function updateRelayState(newState) {
  set(relayRef, newState)
    .then(() => {
      console.log('Relay state updated successfully!');
      initialState = newState
    })
    .catch((error) => {
      console.error('Error updating relay state:', error);
    });
}


function changevalue(){
  updateRelayState(!initialState)
  if(initialState == false){
    document.getElementById("water-pump").innerText = "TURN OFF"
  }
  else{
    document.getElementById("water-pump").innerText = "TURN ON"
  }
}


document.getElementById("water-pump").addEventListener("click",(event)=>{
  changevalue()
})

function updateLightLevel(value) {
  const angleValue  = value*360/100
  const lightElement = document.getElementById('light');
  const progressElement = document.querySelector('#light-back');
  
  progressElement.style.background = `conic-gradient(#471947 ${angleValue}deg, #757575 ${angleValue}deg)`;
}

function updateSoilLevel(value) {
  const angleValue  = value*360/100
  const lightElement = document.getElementById('soil');
  const progressElement = document.querySelector('#soil-back');
  
  progressElement.style.background = `conic-gradient(#471947 ${angleValue}deg, #757575 ${angleValue}deg)`;
}

function updateAirTemperature(value) {
  const angleValue  = value*360/100
  const lightElement = document.getElementById('temperature');
  const progressElement = document.querySelector('#temperature-back');
  
  progressElement.style.background = `conic-gradient(#471947 ${angleValue}deg, #757575 ${angleValue}deg)`;
}

function updateAirHumidity(value) {
  const angleValue  = value*360/100
  const lightElement = document.getElementById('humidity');
  const progressElement = document.querySelector('#humidity-back');
  
  progressElement.style.background = `conic-gradient(#471947 ${angleValue}deg, #757575 ${angleValue}deg)`;
}