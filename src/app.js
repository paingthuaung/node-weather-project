const path    = require('path');
const express = require('express');
const hbs     = require('hbs');
const forecast = require('../utils/forecast')

const app = express();
app.set('view engine','hbs');
app.use(express.static('public'));

const viewsDir  = path.join(__dirname,'../templates/views');
const partialDir = path.join(__dirname,'../templates/partials')
app.set('views',viewsDir);
hbs.registerPartials(partialDir);

app.get('/',(req,res)=>{
    res.render('index',{
        title : 'Weather App',
        name  : 'Nobody'
    });
});
app.get('/help',(req,res)=>{
    res.render('help',{
        text : 'This is help page',
        title : 'Help',
        name  : 'Nobody'
    });
});
app.get('/about',(req,res)=>{
    res.render('about',{
        title : 'About Me',
        name  : 'Nobody'
    });
});
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error : 'You must provide address'
        });
    }
    forecast(req.query.address,(error,forecastData)=>{
        if(error){
            return res.send({error});
        }else {
            res.send({
                temp : forecastData.temperature,
                feelLike : forecastData.feelLike,
                region   : forecastData.region,
                country  : forecastData.country,
                condition : forecastData.condition,
            });
        }
    });
});
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title  : '404',
        name   : 'Nobody',
        errorMessage : 'Help article not found!'
    });
})
app.get('*',(req,res)=>{
    res.render('404',{
        title : '404',
        name  : 'Nobody',
        errorMessage : 'Page not found'
    });
});
app.listen(3000,()=>{
    console.log('Server is running!');
});