//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html")
});

app.post("/",function(req,res){
    var n1 = Number(req.body.num1);
    var n2=Number(req.body.num2);
    var result = n1+n2;
    res.send("The value is" +result);
    // res.send("Thanks for posting...");
    // console.log(req.body);
});

app.get("/bmicalculator",function(req,res){
    res.sendFile(__dirname+"/bmicalculator.html");
});

app.post("/bmicalculator",function(req,res){
    var n1 = parseFloat(req.body.weight);
    var n2=parseFloat(req.body.height);
    var result = (n1/(n2*n2));
    res.send("Your BMI is" +result);
});

app.listen(3000,function(){
    console.log("Server is running on port 3000");
});