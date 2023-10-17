window.onload = async () => {
    let location = await getUserCoordinates();
    myMap.coordinates = location;
    myMap.createMap(location);
};
let myMap = {
    createMap: function (location) {
        // created map
        let map = L.map("map", {
            center: location,
            zoom: 13,
        });
        // create tile layer
        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
                '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(map);
        // created marker popup
        let marker = L.marker(location);
        marker.addTo(map).bindPopup("<p>You Are Here</p>").openPopup();
    },
};

async function getUserCoordinates() {
    let position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    return [position.coords.latitude, position.coords.longitude];
}
// installed foursquare
let options = {
    method: "GET",
    headers: {
        accept: "application/json",
        authorization: "fsq3cIoEHDklwLAce97YGM8OoyehOI1L5NaMunm/QRHV2Fw=",
    },
};
// used fetch to retrieve data
async function fetchPlaces() {
    let response = await fetch(
        `https://cors-anywhere.herokuapp.com/https://api.foursquare.com/v3/places/search?&query=${business}&limit=5&ll=${myMap.coordinates}`,
        options
    );
    let places = response.json();
    return places;
}

// processed data to make a locations array
function parseLocations() {
    let locations = [];
    results.forEach((result) => {
        let location = [results.geocodes.name, result.name];
        locations.push(location);
    });
    return locations;
}

document.getElementById("submit").addEventListener("click", function (e) {
    e.preventDefault();
    submitButton();
});

function submitButton() {
    let business = document.getElementById("business").value;
    let fourSquareData = fetchPlaces(business);
    parseLocations(fourSquareData);
    fourSquareData = business;
    myMap.addMarkers();
}

// restaurant markers
const mcdonalds = L.marker([32.647562716070446, -116.96677544592444]).bindPopup(
    "McDonald's"
);

const flameBroiler = L.marker([
    32.64659170362784, -116.96593437542477,
]).bindPopup("Flame Broiler");

const polygonRestaurants = L.layerGroup([mcdonalds, flameBroiler]).addTo(myMap);

// using foursquare data to create a group of markers

// --------

// API KEYYYYY - fsq3cIoEHDklwLAce97YGM8OoyehOI1L5NaMunm/QRHV2Fw=

/* things we need in here  */

// map object

// coordinates for geolocation

// process foursquare array

// window l o a d

// business submit button
