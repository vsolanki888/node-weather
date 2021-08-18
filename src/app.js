const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./util/geocode')
const forecast = require('./util/forecast')
const port = process.env.PORT || 3000;

const app = express()
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../templates/views'))
hbs.registerPartials(path.join(__dirname, '../templates/partials'))

app.use(express.static(path.join(__dirname, '../public')))

app.get('/', (req, res) => {
    res.render('index', {
        'title':'Weather',
        'name':'vishal solanki'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            status: 'error',
            message: 'please provide address'
        })
    }
    geocode(req.query.address, (error, {longitute, latitude, location} = {}) => {
        if(error){
            return res.send({
                status:'error',
                message:error
            })
        }
        else{
            forecast(latitude, longitute, (error, data) => {
                if(error){
                    return res.send({
                        status:'error',
                        message:error
                    })
                }
                else{                    
                    res.send({forecast:data,location, address:req.query.address});
                }
            })
        }
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        'title':'about',
        'name':'vishal solanki'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        'title':'about',
        'helpText':'Please help people',
        'name':'vishal solanki'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        'title':'Page Not Found',
        'errorMessage': 'Help Page not found',
        'name':'vishal solanki'
    })
})

app.get('/*', (req, res) => {
    res.render('404',{
        'title':'Page Not Found',
        'errorMessage': 'Page not found',
        'name':'vishal solanki'
    })
})

app.listen(port, () => {
    console.log('listening on '+port);
})