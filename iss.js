/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const request = require('request');
const myUrl = 'https://api.ipify.org?format=json';
const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request(myUrl, (error, response, body) => {
    if (error) return callback(error, null);
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(msg, null);
      return;
    }
    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};


const fetchCoordsByIP = function(ip, callback) {
  request('https://ipwho.is/' + ip, (error, response, body) => {
    if (error) return callback(error, null);
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(msg, null);
      return;
    }
    const objIP = JSON.parse(body);
    if(!objIP.success) {
      const message = `Success status was ${objIP.success}. Server message says: ${objIP.message} when fetching for IP ${objIP.ip}`;
      callback(Error(message), null);
      return;
    }
    callback(null, objIP.ip);
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP };