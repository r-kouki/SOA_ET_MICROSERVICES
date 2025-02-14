import request from "request";

const API_URL = "https://randomuser.me/api/?results=10";

function fetchRandomUsers() {
  request(API_URL, { headers: { "User-Agent": "Mozilla/5.0" } }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const data = JSON.parse(body).results;

      console.log("\nRandom Users Table:");
      console.log("----------------------------------------------------------------------------------------------");
      console.log(" Name                | Gender | Age | Phone            | Country              | Email");
      console.log("----------------------------------------------------------------------------------------------");

      data.forEach(user => {
        const name = `${user.name.first} ${user.name.last}`;
        const gender = user.gender;
        const age = user.dob.age;
        const phone = user.phone;
        const country = user.location.country;
        const email = user.email;

        console.log(`${name.padEnd(20)} | ${gender.padEnd(6)} | ${age.toString().padEnd(3)} | ${phone.padEnd(15)} | ${country.padEnd(20)} | ${email}`);
      });

      console.log("----------------------------------------------------------------------------------------------");
    } else {
      console.log("\nError retrieving random user data.");
    }
  });
}

fetchRandomUsers();
