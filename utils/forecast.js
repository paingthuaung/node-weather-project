const request = require('request');

const apiKey    = 'a245dd84b57943c186c14757241602';


const forecast = (location,callback)=>{
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(location)}`;
    request(apiUrl, { json: true }, (error, response, body) => {
      if (error) {
          callback('Unable to connect service!', undefined);
      } else if (body.error && body.error.code === 1006) {
          callback('Unable to find exact location');
      } else if (body.location.name.toLowerCase() !== location.toLowerCase()) {
          callback('Location not an exact match');
      } else {
        callback(undefined,{
          temperature : response.body.current.temp_c,
          region      : response.body.location.region,
          country     : response.body.location.country,
          lat         : response.body.location.lat,
          lon         : response.body.location.lon,
          condition   : response.body.current.condition.text,
          feelLike    : response.body.current.feelslike_c 
        });   
      }
  });
}

module.exports = forecast;