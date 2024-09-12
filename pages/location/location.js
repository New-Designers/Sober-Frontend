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
    clearInterval(timerInterval);  // Stop the timer
    const accumulatedTime = formatTime(elapsedSeconds);  // Format the elapsed time
    document.getElementById("end-time").textContent = new Date().toLocaleTimeString();  // Update the end time display
    document.getElementById("timer-container").style.display = "none";  // Hide the timer container
    document.getElementById("accumulated-time").textContent = accumulatedTime;  // Set the accumulated time text
    document.getElementById("accumulated-time-container").style.display = "block";  // Show the accumulated time container
}


function showTimer() {
    var locationInput = document.getElementById("location-input").value;
    if (locationInput.trim() === "") {
        // Alert the user that a location must be entered
        alert("Please enter a location to confirm.");
        return; // Stop the function from proceeding
    }

    // Proceed with showing the timer and other operations
    document.getElementById("map").style.height = "35vh"; // Reduce the height of the map
    document.getElementById("timer-container").style.display = "block";
    document.getElementById("confirm-button").style.display = "none";
}


function resetPage() {
    document.getElementById("map").style.height = "70vh"; // Restore the full height of the map
    document.getElementById("timer-container").style.display = "none";
    document.getElementById("confirm-button").style.display = "block"; // Show the confirm button again
    document.getElementById("recommended-places-container").style.display = "none"; // Hide recommended places
    clearInterval(timerInterval); // Stop the timer
    elapsedSeconds = 0; // Reset the seconds count
    document.getElementById("timer").textContent = "00:00:00"; // Reset the timer display
    document.getElementById("start-timer").style.display = "inline-block"; // Show the start button again
    document.getElementById("stop-timer").style.display = "none"; // Hide the stop button
    document.getElementById("begin-time").textContent = "--:--:--"; // Reset the begin time
    document.getElementById("end-time").textContent = "--:--:--"; // Reset the end time
    document.getElementById("accumulated-time-container").style.display = "none";
    // Optionally, clear any data that might have been loaded into the places list
    const placesList = document.getElementById("recommended-places-list");
    if (placesList) {
        placesList.innerHTML = ''; // Clear the list of places
    }
}

function recommendActivities() {
    // Hide the timer and total time display
    document.getElementById("accumulated-time-container").style.display = "none";

    const mapCenter = map.getCenter(); // Assuming 'map' is already initialized and available

    const service = new google.maps.places.PlacesService(map);
    const request = {
        location: mapCenter,
        radius: '2000', // Search within 2000 meters
        type: ['gym', 'shopping_center'] // Types of places to search for
    };

    service.nearbySearch(request, function(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            displayRecommendedPlaces(results);
        } else {
            alert("Failed to fetch recommended places: " + status);
        }
    });
}

function displayRecommendedPlaces(places) {
    const placesList = document.getElementById("recommended-places-list");
    placesList.innerHTML = ''; // Clear previous entries

    // Limit to the first 5 places
    places.slice(0, 5).forEach(place => {
        const li = document.createElement('li');
        li.textContent = place.name + " - " + (place.rating || "No rating") + " stars";
        li.classList.add("list-group-item");
        placesList.appendChild(li);
    });

    document.getElementById("recommended-places-container").style.display = "block";
}


document.addEventListener("DOMContentLoaded", function() {
    const locationInput = document.getElementById("location-input");
    const confirmButton = document.getElementById("confirm-button");

    // Function to update button's disabled state based on input
    function updateButtonState() {
        confirmButton.disabled = locationInput.value.trim() === "";
    }

    // Initial check in case there's already text in the input when the page loads
    updateButtonState();

    // Add event listener for input changes
    locationInput.addEventListener("input", updateButtonState);
});
