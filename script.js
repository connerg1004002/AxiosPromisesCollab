let spinner = null;





// Fetches a list of upcoming space launches from the SpaceDevs API
// and passes the results to a callback function
function getUpcomingLaunches(callback) {
  axios.get("https://lldev.thespacedevs.com/2.3.0/launches/upcoming/").then(response => callback(response.data.results)).catch(err => console.log(`An error has occurred : ${err}`));

  // const xhr = new XMLHttpRequest();
  // xhr.open("GET", "https://lldev.thespacedevs.com/2.3.0/launches/upcoming/");
  // xhr.onload = function () {
  //   const data = JSON.parse(xhr.responseText); // Parse the JSON response
  //   callback(data.results); // Pass the results array to the callback
  // };
  // xhr.send(); // Send the HTTP request
}

// Populates a dropdown menu with upcoming launch names
function populateDropdown(launches) {
  const dropdown = document.getElementById("launchDropdown");

  // For each launch, create an <option> element and add it to the dropdown
  launches.forEach((launch) => {
    const option = document.createElement("option");
    option.textContent = launch.name; // Display name in the dropdown
    option.value = launch.id; // Store launch ID as the option's value
    dropdown.appendChild(option);
  });
}

// Fetches details about a specific launch by ID and passes it to a callback

function getLaunchDetails(launchId, callback) {
    spinner.style.display = 'block';
  axios.get(`https://lldev.thespacedevs.com/2.3.0/launches/${launchId}/`).then(response => callback(response.data)).catch(err => console.log(`An error has occurred : ${err}`)).finally(() => spinner.style.display = 'none');


  // const xhr = new XMLHttpRequest();
  // xhr.open("GET", `https://lldev.thespacedevs.com/2.3.0/launches/${launchId}/`);
  // xhr.onload = function () {
  //   const launch = JSON.parse(xhr.responseText); // Parse JSON response
  //   callback(launch); // Pass launch details to callback
  // };
  // xhr.send(); // Send the HTTP request
}

// Add event listener to dropdown to respond when a user selects a launch
document.getElementById("launchDropdown").addEventListener("change", function () {
  const launchId = this.value; // Get selected launch ID

  // Fetch and display launch details
  getLaunchDetails(launchId, function (launch) {

    const missionDetails = document.getElementById("missionDetails");
    const astronautsDiv = document.getElementById("astronauts"); // Not used here, but may be used later

    // Display mission name and description
    missionDetails.innerHTML = `<h3>Mission: ${launch.mission.name}</h3><p>${launch.mission.description}</p>`;

    // Log rocket data to console for debugging
    console.log(launch.rocket);

    // Display the rocket image
    const rocket = document.getElementById("rocket");
    rocket.innerHTML = ""; // Clear any existing content

    let rocketImage = document.createElement("img");
    rocketImage.src = launch.rocket.configuration.image.image_url; // Rocket image URL
    rocketImage.alt = "Rocket Image"; // Alt text for accessibility
    rocketImage.style.width = "500px"; // Set image width
    rocket.appendChild(rocketImage); // Add image to the DOM
  });
});



// Fetch and display the dropdown when the page loads
getUpcomingLaunches(populateDropdown);

spinner = document.getElementById("spinner");
spinner.style.display = 'none';