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

function resetPage() {
    // Stop the timer if it's running
    clearInterval(timerInterval);
    
    // Reset timer display
    document.getElementById("timer").textContent = "00:00:00";
    document.getElementById("timer-container").style.display = "none"; // Hide the timer container
    
    // Restore full map size
    document.getElementById("map").style.height = "70vh"; // Set to original height or adjust as needed

    // Optionally reset the timer variables
    elapsedSeconds = 0;
    document.getElementById("start-timer").style.display = "none"; // Hide start button
    document.getElementById("stop-timer").style.display = "none"; // Hide stop button
    
    // Go back to the previous page
    window.history.back();
}

// Initializing global variables for the timer
let timerInterval;
let elapsedSeconds = 0;

// Function to format the elapsed time into a hh:mm:ss format
function formatTime(totalSeconds) {
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;

    return [hours, minutes, seconds]
        .map(v => v < 10 ? "0" + v : v)
        .join(":");
}

// Function to start the timer
function startTimer() {
    document.getElementById("start-timer").style.display = "none"; // Hide the start button
    document.getElementById("stop-timer").style.display = "inline-block"; // Show the stop button
    timerInterval = setInterval(function() {
        elapsedSeconds++;
        document.getElementById("timer").textContent = formatTime(elapsedSeconds);
    }, 1000);
}

// Function to stop the timer and reset
function stopTimer() {
    clearInterval(timerInterval);
    alert("Timer stopped at: " + document.getElementById("timer").textContent);
    resetTimer();
}

// Function to reset the timer to the initial state
function resetTimer() {
    elapsedSeconds = 0;
    document.getElementById("timer").textContent = "00:00:00";
    document.getElementById("start-timer").style.display = "inline-block"; // Show start button again
    document.getElementById("stop-timer").style.display = "none"; // Hide stop button
}

// Event listener for the Confirm button
document.querySelector(".btn-custom-green").addEventListener("click", function() {
    document.getElementById("map").style.height = "35vh"; // Reduce map height
    document.getElementById("timer-container").style.display = "block"; // Show the timer container
    document.getElementById("start-timer").style.display = "inline-block"; // Show the start button
});
