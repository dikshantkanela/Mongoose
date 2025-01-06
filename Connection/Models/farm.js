const mongoose = require("mongoose");
const Product = require("../Models/products");
const farmSchema = new mongoose.Schema({
      name:{
        type:String,
        required:[true,"Farm should have a name!"]
      },
      city:{
        type:String
      },
      email:{
        type:String,
        required:true
      },
      products:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Product' // two way
        }
      ]
});

farmSchema.pre('findOneAndDelete', async(data)=>{
  console.log("PRE MIDDLEWARE");
  console.log(data)
});

farmSchema.post('findOneAndDelete', async(farm)=>{
   if(farm.products.length!==0){
    await Product.deleteMany({_id:{$in:farm.products}}); // delete all products linked to farm 
   }
});

const Farm = mongoose.model("Farm",farmSchema);
module.exports = Farm;