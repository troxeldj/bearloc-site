// Requires for Modules
require("dotenv").config();
const express = require("express");
const app = express();
const ejs = require("ejs");
const PORT = 3000;
const bodyParser = require("body-parser");
const mariadb = require("mariadb");
const { Client } = require("@googlemaps/google-maps-services-js");
const {
  geocode,
} = require("@googlemaps/google-maps-services-js/dist/geocode/geocode");

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

// Google Maps Connection

// App Values
app.set("views", "./views");
app.set("view engine", "ejs");

// Mounted Middleware
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index", {});
});

app.post("/search", async (req, res) => {
  userparams = { bedrooms: req.body.bedrooms, bathrooms: req.body.bathrooms };
  let foundListings = await getListings(pool);
  templateListings = foundListings.filter(
    (listing) =>
      listing.NUMBEDROOMS == userparams.bedrooms &&
      listing.NUMBATHROOMS == userparams.bathrooms
  );
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
    findDistancetoUC,
  });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

// Establish DB Connection
async function dbConnection() {
  let conn;
  try {
    conn = await pool.getConnection();
  } catch (err) {
    console.log("unable to establish db connection...");
    console.log(err);
  } finally {
    if (conn) conn.release();
  }
}

async function getListings(pool, bedrooms, bathrooms) {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM LIST_LISTINGS");
    return rows;
  } catch (err) {
    console.log("unable to establish db connection...");
    console.log(err);
  } finally {
    if (conn) conn.release();
  }
}

async function geoCodeLocation(apiKey, address) {
  const client = new Client({});
  return client.geocode({
    params: {
      key: apiKey,
      address: address,
    },
  });
}

async function findDistancetoUC(apiKey, destCoords) {
  const originCoords = [39.1329, 84.515];
  const client = new Client({});
  return client.distancematrix({
    params: {
      key: apiKey,
      origins: originCoords,
      destinations: destCoords,
    },
  });
}

function buildMapURL(apiKey, address) {
  const UC_ADDR = "2600 Clifton Ave, Cincinnati, OH 45220";
  const encodedAddr = address.replaceAll(" ", "%20");
  const baseURL = `https://www.google.com/maps/embed/v1/directions?key=${apiKey}`;
  // const destinationGeo = await geoCodeLocation(apiKey, address);
  const newURL = baseURL.concat(
    `&origin=${UC_ADDR}&destination=${address}&mode=walking`
  );
  return newURL;
}
