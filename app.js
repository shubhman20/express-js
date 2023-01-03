const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
    const value = req.body.cityName;
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ value+"&appid=3468da920f4ba4bf02e0274cd6da58a2&units=metric";
    https.get(url,function(response){
        console.log(response.statusMessage);
        response.on("data",function(data){
            const weather = JSON.parse(data);
            const temp = weather.main.temp;
            const city = weather.name;
            const desc = weather.weather[0].description;
            const icon = weather.weather[0].icon;
            const image =  "http://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("<p><h1>Description = "+desc+"</h1><p>")
            res.write("<h1>Temperature is: "+temp+"degree/Celsius in "+city+"</h1>");
            res.write("<img src="+image+">")
            res.send();
        })
    });
});




app.listen(3000,function(){
    console.log("Server is running on port 3000.");
})