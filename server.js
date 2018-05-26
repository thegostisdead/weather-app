const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()
const apiKey = '74c057c0a9604809f0b68e1041be83b4';
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set('view engine', 'ejs')
app.get('/', function (req, res) {
    res.render('index', {
        weather: null,
        error: null,
        humidity: null,
        wind: null,
        description: null,
        lat: null,
        lon: null,
        country: null
    });
})
app.post('/', function (req, res) {
    let city = req.body.city;
    let zip = req.body.zip
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city},FR&units=metric&appid=${apiKey}`
    let postale = `http://api.openweathermap.org/data/2.5/weather?zip=${zip},FR&units=metric&appid=${apiKey}`

    if (city != undefined) {
        request(url, function (err, response, body) {
            if (err) {
                res.render('index', {
                    weather: null,
                    error: 'on traite la ville' + url
                });
            } else {
                let json = JSON.parse(body)
                if (json.main == undefined) {
                    res.render('index', {
                        weather: null,
                        error: 'on traite la ville'
                    });
                    console.log(" ,kk,d,v,fdv,fdvd")
                } else {
                    console.log(" Affichage en cour ...")
                    let weatherText = `Il fait ${json.main.temp} degrés à ${json.name}!`;
                    let humidityText = `Le taux d'humiditée est de : ${json.main.humidity} %`;
                    let windText = `La vitesse du vent est de : ${json.wind.speed} km/h`;
                    let descriptionText = `Situation : ${json.weather[0].main}`;
                    let lonText = `La longitude : ${json.coord.lon}`;
                    let latText = `La latitude : ${json.coord.lat}`;
                    let countryText = `Pays : ${json.sys.country}`;
                    res.render('index', {
                        weather: weatherText,
                        humidity: humidityText,
                        wind: windText,
                        lonText: lonText,
                        latText: latText,
                        lon: json.coord.lon,
                        lat: json.coord.lat,
                        description: descriptionText,
                        country: countryText,
                        error: null
                    });
                }
            }
        });
    } else {
        request(postale, function (err, response, body) {
            if (err) {
                res.render('index', {
                    weather: null,
                    error: 'on traite le postale' + postale
                });
            } else {
                let json = JSON.parse(body)
                if (json.main == undefined) {
                    res.render('index', {
                        weather: null,
                        error: 'on traite le postale'
                    });
                } else {
                    let weatherText = `Il fait ${json.main.temp} degrés à ${json.name}!`;
                    let humidityText = `Le taux d'humiditée est de : ${json.main.humidity} %`;
                    let windText = `La vitesse du vent est de : ${json.wind.speed} km/h`;
                    let descriptionText = `Situation : ${json.weather[0].main}`;
                    let lonText = `La longitude : ${json.coord.lon}`;
                    let latText = `La latitude : ${json.coord.lat}`;
                    let countryText = `Pays : ${json.sys.country}`;
                    res.render('index', {
                        weather: weatherText,
                        humidity: humidityText,
                        wind: windText,
                        lon: lonText,
                        lat: latText,
                        description: descriptionText,
                        country: countryText,
                        error: null
                    });
                }
            }
        });
    }

})
app.listen(3000, function () {
    console.log('Running & listening on port 3000!')
})