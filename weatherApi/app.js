const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html")
    
});

app.post("/", function(req, res){
    console.log(req.body.cityName);

    const query = req.body.cityName;
    const apiKey = process.env.API_KEY;
    
    const url = "https://api.openweathermap.org/data/2.5/weather?&q="+query+ "&appid="+ apiKey;

    https.get(url, function(response){
        console.log(response);
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data)
            console.log(weatherData);
            console.log(JSON.stringify(weatherData))

            const temp = weatherData.main.temp;
            console.log(temp);

            const weatherDes = weatherData.weather[0].description;
            console.log(weatherDes);

            const code = weatherData.weather[0].icon;
            const icon = "https://openweathermap.org/img/wn/" + code + "@2x.png";

            res.write("<h2>temp = " + temp + "degrees</h2>");
            res.write("<p> the  current weather is" + weatherDes + "</p>")

            res.write("<img src=" + icon +">")

            res.send();
        })
    });


    console.log("Post request recieved");
})

    // we can use only one send method in a get method
    // res.send("server is up and running")


app.listen(3000, function(){
    console.log("server is running on port 3000.")
})