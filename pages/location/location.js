let map;
let autocomplete;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8,
    });

    autocomplete = new google.maps.places.Autocomplete(
        document.getElementById("location-input"),
        { types: ["geocode"] }
    );
    autocomplete.setFields(["formatted_address", "geometry"]);
    autocomplete.addListener("place_changed", onPlaceChanged);
}

function onPlaceChanged() {
    const place = autocomplete.getPlace();
    if (place.geometry) {
        map.panTo(place.geometry.location);
        map.setZoom(15);
    } else {
        document.getElementById("location-input").placeholder = "Enter a place";
    }
}


// Initializing global variables for the timer
let timerInterval;
let elapsedSeconds = 0;

function formatTime(totalSeconds) {
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;
    return [hours, minutes, seconds].map(v => v < 10 ? "0" + v : v).join(":");
}

function startTimer() {
    document.getElementById("start-timer").style.display = "none";
    document.getElementById("stop-timer").style.display = "block";
    document.getElementById("begin-time").textContent = new Date().toLocaleTimeString();
    document.getElementById("end-time").textContent = "--:--:--";
    timerInterval = setInterval(function() {
        elapsedSeconds++;
        document.getElementById("timer").textContent = formatTime(elapsedSeconds);
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
    document.getElementById("end-time").textContent = new Date().toLocaleTimeString();
}

function showTimer() {
    document.getElementById("map").style.height = "35vh"; // Reduce the height of the map to half
    document.getElementById("timer-container").style.display = "block";
    document.getElementById("confirm-button").style.display = "none";
}

function resetPage() {
    document.getElementById("map").style.height = "70vh"; // Restore the full height of the map
    document.getElementById("timer-container").style.display = "none";
    document.getElementById("confirm-button").style.display = "block"; // Show the confirm button again
    clearInterval(timerInterval); // Stop the timer
    elapsedSeconds = 0; // Reset the seconds count
    document.getElementById("timer").textContent = "00:00:00"; // Reset the timer display
    document.getElementById("start-timer").style.display = "inline-block"; // Show the start button again
    document.getElementById("stop-timer").style.display = "none"; // Hide the stop button
    document.getElementById("begin-time").textContent = "--:--:--"; // Reset the begin time
    document.getElementById("end-time").textContent = "--:--:--"; // Reset the end time
}
