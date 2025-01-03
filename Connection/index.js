//Express SETUP : 
const express = require("express");
const app = express();
const methodOverride = require('method-override');
//EJS SETUP : 
const path = require('path'); //for current path 
app.set('views',path.join(__dirname,'views')); //to get path of views folder
app.set('view engine','ejs'); //run ejs

app.use(express.urlencoded({extended: true})); //Middleware TO PARSE DATA FROM FORMS
app.use(methodOverride('_method'));
const AppError = require('./AppError');
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

// #HOME : 
app.get('/',(req,res)=>{
    res.send("WELCOME");
})

//ROUTES :  
//1.) To display all the products (READ)
app.get('/products',async(req,res,next)=>{
    try{
    const {category} = req.query;
    if(category){
        const products = await Product.find({category:category})
        res.render("products/index.ejs",{products,category}) //passing the products from db to ejs template to display in the route!
    }
    else{
        const products = await Product.find({}); //Mongoose QUERY to get data
        res.render("products/index.ejs",{products,category:"All"})
    } 
    }
    catch(e){
        next(e);
    }
   

})


//3.) To create a new product using a form (just getting a form to input)
app.get('/products/new',(req,res)=>{
    throw new AppError("Not authorised",401);
    res.render('products/new.ejs',{categories});
})

// 4.) For creating a product using a post req : 
app.post('/products', async (req,res,next)=>{
    try{
        const newProduct = await Product.create(req.body);
        res.redirect(`/products/${newProduct._id}`)
     
    }
    catch(e){
        next(e);
    }
})

//2.) To display details about a specific product
const wrapAsync = (fn)=>(req,res,next)=>{
    fn(req,res,next).catch(e=>next(e)); //this is return
}

app.get('/products/:id', wrapAsync(async(req,res,next)=>{
   
        const {id}  = req.params; //extract the product id passed in url
        const foundProduct = await Product.findById(id); //find by that id in database
        if(!foundProduct){
          throw new AppError("Product not found!",404);
        }
        res.render('products/show.ejs',{foundProduct}); 
  
}))
// 5.) To EDIT (UPDATE) : 
//#1 ROUTE :  
    app.get('/products/:id/edit',async(req,res,next)=>{
        try{
            const {id} = req.params;
            const product = await Product.findById(id);
            if(!product){
                throw new AppError("Product not found and can't be edited",404);
            }
            res.render('products/edit.ejs',{product,categories});
        }
        catch(e){
            next(e);
        }
})
//#2 ROUTE : 
    app.put('/products/:id',async(req,res,next)=>{
        try{
            const {id} = req.params;
            const updatedProduct = await Product.findByIdAndUpdate(id,req.body,{runValidators:true,new:true})
            console.log(req.body); //EDITED THING
            res.redirect(`/products/${updatedProduct._id}`) //REDIRECT AFTER UPDATING TO THE EDITED PRODUCT!
        }
        catch(e){
            next(e);
        }
        
    })


// 6.) DELETE : 
    app.delete('/products/:id',async(req,res)=>{
        const {id} = req.params;
        const deleteItem = await Product.findByIdAndDelete(id);
        res.redirect('/products');
        console.log("DELETED ITEM : ", deleteItem);
    })


// ERROR HANDLER : 

const handleValidation = (err)=>{
    console.dir(err);
    return new AppError(`Product Validation failed... ${err.message}`,400);
}

// checking by name of diff errors
app.use((err,req,res,next)=>{
    const {name} = err;
    console.log(name); // tells type of error like validation,casterror, (**simply Error for product not found**)
    if(name === "ValidationError"){
        err = handleValidation(err);
    } 
    console.log(err.message);
    // res.send(name);
    next(err);
})


app.use((err,req,res,next)=>{
    const {status = 500, message = "Some Error occurred!"} = err;
    res.status(status).send(message);
   
})

//SERVER LIVE : 

app.listen(3000,()=>{
    console.log("SERVER IS LIVE ON LOCALHOST:3000");
})


// read --> 3 ways --> all, specific, by category **no form
//create --> form to create and then a post request from the form
//update --> form to update a specific item and then a put request from the form
//delete --> just a simple route to delete, ONE EXTRA TASK : WRAP A DELETE BUTTON in a form that should redirect as a post (delete) 
// CREATE, DELETE, UPDATE : res.redirect()