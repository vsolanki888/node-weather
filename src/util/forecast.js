const request = require('request');
const forecast = (lat, lon, callback) => { 
    const url = 'http://api.weatherstack.com/current?access_key=2dc000ac7461ef7eaa8e4f1df268c282&query='+lat+','+lon+'&units=f';  
    request({url:url, json:true}, (error, response) => {
        if(error){
            callback('unable to connect api')
        }
        else if(response.body.error){
            callback(response.body.error.code)
        }
        else {
            const resObj = response.body.current;
            callback(undefined, 'currently it is '+resObj.temperature+' farhrenheit out. There is a '+resObj.precip+' probability of rain');
        }
    })
 }
module.exports = forecast;