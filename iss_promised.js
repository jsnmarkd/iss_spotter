/* 
* Input: None
* Returns: Promise for fly over data for users location
*/
const nextISSTimesForMyLocation = function () {
  return fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then((data) => {
    const { response } = JSON.parse(data);
    return response;
  });
};

const request = require('request-promise-native');

const myUrl = 'https://api.ipify.org?format=json';
const fetchMyIP = function() {
  return request(myUrl);
};

const fetchCoordsByIP = function (body) {
  const ip = JSON.parse(body).ip;
  return request(`https://ipwho.is/${ip}`);
};

const fetchISSFlyOverTimes = function (coords) {
  const { latitude, longitude } = JSON.parse(coords);
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`;
  return request(url)
}


module.exports = { /*fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, */nextISSTimesForMyLocation };