const mongoose = require("mongoose");

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
})

const Farm = mongoose.model("Farm",farmSchema);
module.exports = Farm;