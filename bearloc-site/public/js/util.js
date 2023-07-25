const { Client } = require("@googlemaps/google-maps-services-js");
function convertKmToMiles(km) {
  return km * 0.621371;
}

async function urlEncodeAddress(address) {
  const encodedAddr = address
    .replaceAll(" ", "%20")
    .replaceAll(",", "%2C")
    .replaceAll(".", "%2E");

  return encodedAddr;
}

// Establish DB Connection
async function dbConnection(pool) {
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

module.exports = {
  urlEncodeAddress,
  dbConnection,
  getListings,
  geoCodeLocation,
  buildMapURL,
  convertKmToMiles,
};
