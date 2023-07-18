// Requires for Modules
require("dotenv").config();
const express = require("express");
const app = express();
const ejs = require("ejs");
const PORT = 3000;
const bodyParser = require("body-parser");
const mariadb = require("mariadb");
const { Client } = require("@googlemaps/google-maps-services-js");

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
const client = new Client({});
const geocodeArgs = {
  params: {
    key: process.env.GOOGLE_MAPS_API_KEY,
  },
};

// Test Geocode
// client.geocode(geocodeArgs).then((gcResponse) => {
//   console.log(gcResponse.data.results[0].geometry.bounds.northeast.lat); // Lat
//   console.log(gcResponse.data.results[0].geometry.bounds.northeast.lng); // Lng
// });

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
  res.render("search", { templateListings, userparams, avgPrice });
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
