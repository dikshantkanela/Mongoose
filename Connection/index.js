//Express SETUP : 
const express = require("express");
const app = express();
const methodOverride = require('method-override');
//EJS SETUP : 
const path = require('path'); //for current path 
app.set('views',path.join(__dirname,'views')); //to get path of views folder
app.set('view engine','ejs'); //run ejs

app.use(express.urlencoded({extended: true})); //Middleware
app.use(methodOverride('_method'));

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

const categories = ["fruit","vegetable","dairy"];
//ROUTES :  
//1.) To display all the products (READ)
app.get('/products',async(req,res)=>{
   const products = await Product.find({}); //Mongoose QUERY to get data
   res.render("products/index.ejs",{products}) //passing the products from db to ejs template to display in the route!
})

//3.) To create a new product using a form 
app.get('/products/new',(req,res)=>{
    res.render('products/new.ejs',{categories});
})

// 4.) For creating a product using a post req : 
app.post('/products', async (req,res)=>{
   const newProduct = await Product.create(req.body);
   res.redirect(`/products/${newProduct._id}`)

})

//2.) To display details about a specific product
app.get('/products/:id', async (req,res)=>{
    const {id}  = req.params; //extract the product id passed in url
    const foundProduct = await Product.findById(id); //find by that id in database
    console.log(foundProduct);  
    res.render('products/show.ejs',{foundProduct}); 

})
// 5.) To EDIT (UPDATE) : 
//#1 ROUTE :  
    app.get('/products/:id/edit',async(req,res)=>{
    const {id} = req.params;
    const product = await Product.findById(id);
    res.render('products/edit.ejs',{product,categories});

//#2 ROUTE : 
    app.put('/products/:id',async(req,res)=>{
        const {id} = req.params;
        const updatedProduct = await Product.findByIdAndUpdate(id,req.body,{runValidators:true,new:true})
        console.log(req.body); //EDITED THING
        res.redirect(`/products/${updatedProduct._id}`) //REDIRECT AFTER UPDATING TO THE EDITED PRODUCT!
    })
})

// 6.) DELETE : 
    app.delete('/products/:id',async(req,res)=>{
        const {id} = req.params;
        const deleteItem = await Product.findByIdAndDelete(id);
        res.redirect('/products');
        console.log("DELETED ITEM : ", deleteItem);
    })
//SERVER LIVE : 

app.listen(3000,()=>{
    console.log("SERVER IS LIVE ON LOCALHOST:3000");
})