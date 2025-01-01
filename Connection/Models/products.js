const mongoose = require("mongoose"); 
const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name cannot be blank"],
        lowercase:true
    },
    price:{
        type:Number,
        required:[true,"Price cannot be blank"],
        min:0
    },
    category:{
        type:String,
        enum:['fruit','vegetable','dairy']
    }
})
const Product = mongoose.model("Product",productSchema);

//EXPORT THE MODEL : 
module.exports = Product;