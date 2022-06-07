const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public');
const viewPaths = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and view location
app.set('view engine','hbs')
app.set('views', viewPaths);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));


app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Rendy'
    });
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About page',
        name: 'Rendy'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        message: 'Message',
        title: 'Help',
        name: 'Rendy'
    })
})


app.get('/help/*', (req,res) => {
    res.render('404', {
        title: 'Help',
        message: 'Help article not found'
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'No available address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if(error){
            return res.send({error})
        }

        forecast(latitude,longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})


app.get('/products', (req,res) => {
    if(!req.query.search){  
    res.send({
        error: 'You must provide a search term'
    })
    }

    
    res.send({
        product: []
    })
});


app.get('*', (req,res) => {
    res.render("404", {
        title: '404 Not Found',
        message: 'Not Found'
    })
});

app.listen(port, () => {
    console.log('Server is up on port '+port);
})