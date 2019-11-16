const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const publicPath = path.join(__dirname, '../public')
const tempPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', tempPath)
hbs.registerPartials(partialPath)

app.use(express.static(publicPath))


app.get('', (req, res) => {
    res.render('index', {
        title:'Weather',
        name:'Weather-vishal'
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title:'About me',
        name:'About-vishal'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title:'Help Me',
        name: 'Help-vishal'
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({error:'address must be provided'})
    }

    geoCode(req.query.address, (err, {latitude:lat,longitude:long,location:loc} = {}) =>{
        if(err){
            return res.send({err})
        }

        forecast(lat, long, (error, forecastData) => {
            if(error){
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location: loc
            })


        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send('search nhi aaya be') 
    }
    res.send({
        products:[]
    })
})

app.get('/help/*', (req,res) => {
    res.render('pnf',{
        title:'Page Not Found',
        name:'vishal solanki',
        errorMsg:'Vishal help me bro'
    })
})

app.get('*', (req,res) => {
    res.render('pnf', {
        title:'zero',
        errorMsg:'wtf',
        name:'vs'
    })
})
app.listen(3000, () => {
    console.log('server is on port '+ 3000);
})