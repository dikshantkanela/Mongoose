//THIS FILE WILL CONTAIN ALL THE MONGOOSE LOGIC AND EXPORTED MODELS

const mongoose = require("mongoose");
const Product = require("./Models/products");
mongoose.connect('mongodb://127.0.0.1:27017/farmStand',{useNewUrlParser:true,useUnifiedTopology:true}) //Connects mongoose with mongodb //.connect returns a Promise!
   .then(()=>{
    console.log("MONGOOSE CONNECTION OPEN!!");
   })
   .catch((err)=>{
    console.log("OHH NO MONGOOSE ERROR!!!");
    console.log(err);
   })

// const p = new Product({
//     name: "Ruby Grapefruit",
//     price:1.99,
//     category:"fruit"
// })

// p.save()
// .then((product)=>{
//    console.log(product);
// })
// .catch((err)=>{
//     console.log("ERROR!!!",err);
// })

const products = [
  
    { name: 'Gala Apple', price: 0.99, category: 'fruit' },
    { name: 'Milk', price: 2.99, category: 'dairy' },
    { name: 'Organic Banana', price: 1.29, category: 'fruit' },
    { name: 'Carrot', price: 0.49, category: 'vegetable' }
  ];

// Product.insertMany(products)
// .then(res => {
//     console.log("Products Inserted:", res);
//   })
//   .catch(err => {
//     console.log("Error Inserting Products:", err);
//   });