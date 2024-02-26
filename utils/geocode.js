const request = require('request');
const location = 'Maymyo'; // Example location
const apiKey = 'a245dd84b57943c186c14757241602';
const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(location)}`;

request(apiUrl, { json: true }, (error, response, body) => {
    if (error) {
        console.log('Unable to connect service!', undefined);
    } else if (body.error && body.error.code === 1006) {
        console.log('Unable to find exact location');
    } else if (body.location.name.toLowerCase() !== location.toLowerCase()) {
        console.log('Location not an exact match');
    } else {
        console.log(body);
    }
});
