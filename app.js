var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var cors = require('cors');
var path =require('path');
const port=process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname,'/public')))
app.get('/',function(req,res){
    res.sendFile('public/index.html');
})
app.post('/sendMail',function(req,res){
    var data = req.body;
    var template = '';
    data.forEach(element => {
       template += "<h3>"+element.question+"</h3><h4>" + element.answer + "</h4>"  
    });
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'rajurani11071982@gmail.com',
          pass: 'Kiran@1982'
        }
      });
    var mailOptions = {
        from: 'rajurani11071982@gmail.com',
        to: 'kiran.varaprasad@gmail.com',
        subject: 'Chat Form Data',
        html: template
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          res.status(500).send(error)
        } else {
            res.status(200).send("success")
        }
      });
})

app.listen(port,function () {
    console.log("listening to port 3000");
})