const weather = document.querySelector(".js-weather");
const API_KEY = "38cb84355b7ad3bb3676b3b9e6b11d39";
const COORDS = "coords";

// 여기서 fetch 함수는 requests 함수와 같은 역할.
// then은 데이터가 완전히 넘어왔을 때에만 설정된 함수를 호출함.
// 만약 여기서 then을 쓰지 않으면, 아직 API 데이터가 넘어오지 않았는데, 그 다음 함수가 실행되어서 에러가 날 수도 있음!!
function getWeather(lat, lng){
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
        ).then(function(response){
            return response.json();
        }).then(function(json){
            const temperature = json.main.temp;
            const place = json.name;
            weather.innerText = `${place}는 ${temperature}°C  `;
        })
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

// 위치정보 획득에 성공하면 실행하는 함수
function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude : latitude,
        longitude : longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

// 위치정보 획득에 실패하면 실행하는 함수.
function handleGeoError(){
    console.log("Can't access geo location");
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError); // 유저의 현재 위치 정보를 요청하고, 성공하면 첫 번째 함수를, 실패하면 두 번째 함수를 실행.
}

// 로컬 스토리지에 정보가 없으면 요청.
function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS); 
    if(loadedCoords === null){
        askForCoords();
    } else {
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}


function init(){
    loadCoords();
}

init();