const request = require('request');
const geocode = (address, callback) => {
    const mapUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoidmlzaGFsMDAwNyIsImEiOiJja3M5eTY5Y2QwdjhlMnVsdWZwN2lmNjJ5In0.9pUdce9bjrUoaShKZCzzMw';
    request({url:mapUrl, json:true}, (error, response) =>{
        if(error){
           callback('unable to connect api', undefined)
        }
        else if(response.body.message){
           callback(response.body.message, undefined)
        }
        else if(response.body.features.length == 0){
           callback('unable to find location', undefined)
        }
        else{
           callback(undefined, {
            longitute: response.body.features[0].center[0],
            latitude:  response.body.features[0].center[1],
            location:  response.body.features[0].place_name            
           });
        }
    })

}
module.exports = geocode;