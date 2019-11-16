

const request = require('request')
const weather = (lat, long, callback) => {    
    const url = 'https://api.darksky.net/forecast/096567a73671969fb0d79cb42bb6a749/'+lat+','+long
    request({url, json:true}, (err, {body}) => {
        if(err){
            callback('low level os error occured', undefined)
        }
        else if(body.error){
            callback('data not found', undefined)
        }
        else{
            callback(undefined, 'It is currently '+ body.daily.data[0].summary +' There is '+body.daily.data[0].precipProbability+' % chance of rain')
        }
    })
}
module.exports = weather
