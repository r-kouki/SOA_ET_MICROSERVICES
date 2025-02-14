import request from "request";

const API_KEY = "PXID02N1e2oqBPqzxDeIdz9HEtqMKaCXoBQ41SuW";
const START_DATE = "2025-02-08";
const END_DATE = "2025-02-14";
const BASE_URL = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${START_DATE}&end_date=${END_DATE}&api_key=${API_KEY}`;

function fetchAsteroids() {
  request(BASE_URL, { headers: { "User-Agent": "Mozilla/5.0" } }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      console.log("\nHeaders:", response.headers);

      const data = JSON.parse(body);
      console.log(`\nNear-Earth Objects from ${START_DATE} to ${END_DATE}:`);

      Object.keys(data.near_earth_objects).forEach(date => {
        console.log(`\nDate: ${date}`);
        data.near_earth_objects[date].forEach((asteroid, index) => {
          console.log(`${index + 1}. Name: ${asteroid.name}`);
          console.log(`   Estimated Diameter (km): ${asteroid.estimated_diameter.kilometers.estimated_diameter_max}`);
          console.log(`   Hazardous: ${asteroid.is_potentially_hazardous_asteroid ? "Yes" : "No"}`);
          console.log(`   Close Approach Speed (km/h): ${asteroid.close_approach_data[0].relative_velocity.kilometers_per_hour}`);
          console.log("------------------------------------------------");
        });
      });
    } else {
      console.log("\nError retrieving asteroid data.");
    }
  });
}

fetchAsteroids();
