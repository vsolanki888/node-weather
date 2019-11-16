const request = require('request')

geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoidmlzaGFsMDAwNyIsImEiOiJjazJidndjaDIwOG1tM2Jxb3h6a3F0cjNpIn0.t7y4FOCQGEMV-R47nJCOOQ'
    request({url, json:true}, (err, {body}) => {
        if(err){
            callback('low level os error occured', undefined)
        }
        else if(body.features.length == 0){
            callback('data could not find', undefined)
        }
        else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode