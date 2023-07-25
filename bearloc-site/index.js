// Requires for Modules
require("dotenv").config();
const express = require("express");
const app = express();
const ejs = require("ejs");
const fetch = require("node-fetch");
const PORT = 3000;
const bodyParser = require("body-parser");
const mariadb = require("mariadb");
const { Client } = require("@googlemaps/google-maps-services-js");
const {
  urlEncodeAddress,
  dbConnection,
  getListings,
  geoCodeLocation,
  buildMapURL,
  convertKmToMiles,
} = require("./public/js/util.js");
const {
  geocode,
} = require("@googlemaps/google-maps-services-js/dist/geocode/geocode");

const UC_COORDS = { lat: 39.1329, lng: -84.515 };

// DB Connection
const pool = mariadb.createPool({
  host: process.env.SQL_HOST,
  port: 3306,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DB_NAME,
  connectionLimit: 10,
});
dbConnection(pool);
console.log("Database Connection Established.");

// App Values
app.set("views", "./views");
app.set("view engine", "ejs");

// Mounted Middleware
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index", {});
});

// Routes
app.post("/search", async (req, res) => {
  userparams = { bedrooms: req.body.bedrooms, bathrooms: req.body.bathrooms };
  let foundListings = await getListings(pool);
  let templateListings = foundListings.filter(
    (listing) =>
      listing.NUMBEDROOMS == userparams.bedrooms &&
      listing.NUMBATHROOMS == userparams.bathrooms
  );

  // Filters
  if (
    req.body["filter__cost"] == "1" &&
    !Object.values(req.body).includes("filter__distance")
  ) {
    // Cost Filter
    templateListings.sort((a, b) =>
      Number(a.PRICE) > Number(b.PRICE) ? 1 : -1
    );
  } else if (
    req.body["filter__distance"] == "1" &&
    !Object.values(req.body).includes("filter__cost")
  ) {
    // Distance Filter
    const client = new Client({
      key: process.env.GOOGLE_MAPS_API_KEY,
    });

    for (let i = 0; i < templateListings.length; i++) {
      geoCodeLoc = await geoCodeLocation(
        process.env.GOOGLE_MAPS_API_KEY,
        `${templateListings[i].ADDRESSONE} ${templateListings[i].CITY} OH ${templateListings[i].ZIPCODE}`
      ).then((resp) => [
        Number(resp.data.results[0].geometry.location.lat),
        Number(resp.data.results[0].geometry.location.lng),
      ]);

      const disRes = await client.distancematrix({
        params: {
          key: process.env.GOOGLE_MAPS_API_KEY,
          origins: [UC_COORDS],
          destinations: [{ lat: geoCodeLoc[0], lng: geoCodeLoc[1] }],
          TravelMode: "walking",
        },
        timeout: 1000,
      });
      const distanceInfo = {
        distance_mi: Number(
          convertKmToMiles(
            Number(disRes.data.rows[0].elements[0].distance.text.split(" ")[0])
          ).toFixed(2)
        ),
        distance_km: Number(
          disRes.data.rows[0].elements[0].distance.text.split(" ")[0]
        ),
        duration_min: Number(
          disRes.data.rows[0].elements[0].duration.text.split(" ")[0]
        ),
      };
      templateListings[i].MAPSINFO = distanceInfo;
    }
    templateListings.sort(function (a, b) {
      if (a.MAPSINFO.distance_km > b.MAPSINFO.distance_km) {
        return 1;
      }
      if (a.MAPSINFO.distance_km < b.MAPSINFO.distance_km) {
        return -1;
      }
      return 0;
    });
  }

  // Average Price Calculation
  const avgPrice = templateListings.reduce(
    (acc, listing) => acc + Number(listing.PRICE),
    0
  );

  res.render("search", {
    templateListings,
    userparams,
    avgPrice,
    google_maps_key: process.env.GOOGLE_MAPS_API_KEY,
    geoCodeLocation,
    buildMapURL,
  });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
