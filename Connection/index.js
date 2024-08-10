//Express SETUP : 
const express = require("express");
const app = express();

//EJS SETUP : 
const path = require('path'); //for current path 
app.set('views',path.join(__dirname,'views')); //to get path of views folder
app.set('view engine','ejs'); //run ejs

const mongoose = require("mongoose");
const Product = require("./Models/products")
mongoose.connect('mongodb://127.0.0.1:27017/farmStand',{useNewUrlParser:true,useUnifiedTopology:true}) //Connects mongoose with mongodb //.connect returns a Promise!
   .then(()=>{
    console.log("MONGOOSE CONNECTION OPEN!!");
   })
   .catch((err)=>{
    console.log("OHH NO MONGOOSE ERROR!!!");
    console.log(err);
   })
//ROUTES : 
app.get('/dogs',(req,res)=>{
    res.send("WOOF!");
})
//SERVER LIVE : 

app.listen(3000,()=>{
    console.log("SERVER IS LIVE ON LOCALHOST:3000");
})