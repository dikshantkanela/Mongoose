const mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1:27017/productApp',{useNewUrlParser:true,useUnifiedTopology:true}) //Connects mongoose with mongodb //.connect returns a Promise!
   .then(()=>{
    console.log("CONNECTION OPEN!!");
   })
   .catch((err)=>{
    console.log("OHH NO ERROR!!!");
    console.log(err);
   })
// DEFINING A SCHEMA : 
const productSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            minlength:3,
            uppercase:true
        },
        price:{
            type:Number,
            min:[0,"Price cannot be negative!"]
        },
        isOnSale:{
            type:Boolean,
            default:false
        },
        category:{
            type:[String],  //array of string
            enum:["Cycling","Gaming","Fitness"],  //category should be from one of these...
            default:["Cycling"]
            
        }
    }
)


//MODEL INSTANCE METHODS
productSchema.methods.greet = function (){
    console.log("HELUUUU!!!");
}

productSchema.methods.toggleOnSale = function(){
    this.isOnSale = !this.isOnSale;
    return this.save(); // TO SAVE THE ABOVE OPERATION
}

productSchema.statics.cycleFreeSale = function(category){
   return this.updateMany({category},{price:0});
}
// MODEL
const Product = mongoose.model("Product",productSchema);


const bike = new Product({name:"GT 650",price:20000}); //WITH EVERY INSTANCE YOU CAN CALL THE GREET METHOD

const findTheBike = async ()=>{
  const foundBike = await Product.findOne({name:"GT 650"})
  console.log(foundBike);  //BEFORE CALLING THE METHOD!
  //CALL THE METHOD
  await foundBike.toggleOnSale();
  console.log(foundBike);  //AFTER CALLING THE METHOD!
}
findTheBike();

const findCycle = async () =>{
    const foundCycle = await Product.cycleFreeSale("Cylcling")
}
findCycle();