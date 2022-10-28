// WORKING...

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}))

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html")
});

// accessing the form data and logging into our server


app.post("/", function(req, res){

    var firstname = req.body.fName;
    var lastname = req.body.lName;
    var email = req.body.email;

    // console.log(firstname, lastname, email);

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstname,
                    LNAME: lastname
                }
            }
        ]
    };

    // Converting string data to JSON data
    const jsonData = JSON.stringify(data);

    const url = "https://us9.api.mailchimp.com/3.0/lists/47e1b39e2b"

    const options = {
        method: "POST",
        auth: "rohit27:1b8d3c4b700f43d14b2de182527ff41d-us9"
    }

    const request = https.request(url, options, function(response){
        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
          }else{
            res.sendFile(__dirname+"/failure.html");
          }
        
          // logging the data in json format in console
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })         
     })

     request.write(jsonData);
     request.end();

});

app.post("/failure", function(req, res){
    res.redirect("/")
});

app.listen(process.env.PORT || 3000, function(){
    console.log("server is running on port 3000"); 
});


// API KEY:
// 1b8d3c4b700f43d14b2de182527ff41d-us9

// List id
// 47e1b39e2b
 