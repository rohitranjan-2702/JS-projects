const express = require("express");
const { appendFile } = require("fs");
const nodemailer = require("nodemailer")
const bodyparser = require("body-parser")
const path = require("path")

const app = express();

app.use(bodyparser.urlencoded({extended:true}));

app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/index.html")
});

// accessing form data 
app.post("/", function (req, res){

    var Name = req.body.Name;
    var email = req.body.email;
    var msg = req.body.msg;

    console.log(Name, email, msg);
})


// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
      user: 'cluelessrohit@gmail.com', // generated ethereal user
      pass: 'zmrcvyajdntpcjte'  // generated ethereal password
  },
  tls:{
    rejectUnauthorized:false
  }
});

 // setup email data with unicode symbols
 app.get("/send", function(req, res){

  mailOptions = {
    from: '"Email Service" <cluelessrohit@gmail.com>', // sender address
    to: req.query.to, // list of receivers
    subject: "Email from NODE", // Subject line
    text: "DEMO TEXT", // plain text body
    html: '<h1> Hello guys </h1>' // html body
};
console.log(mailOptions);

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);   
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    res.render('contact', {msg:'Email has been sent'});
});
});
 

app.listen(3000, ()=> {
    console.log("server is running on port 3000");
});