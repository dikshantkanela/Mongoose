const mongoose = require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/productApp', { useNewUrlParser: true, useUnifiedTopology: true }) // Connects mongoose with mongodb
    .then(() => {
        console.log("CONNECTION OPEN!!");
    })
    .catch((err) => {
        console.log("OHH NO ERROR!!!");
        console.log(err);
    });

// Define the schema
const peopleSchema = new mongoose.Schema({
    firstName: String,
    lastName: String
});

// THE MIDDLEWARE WILL EXECUTE BEFORE THE SAVE OPERATION IS APPLIED ON ANY DOCUMENT WITH THE SCHEMA
peopleSchema.pre('save', async function (next) {  // PERFORM THIS PRE OPERATION ON ANY Document USING THE SCHEMA
    console.log(`About to save the user ${this.firstName} ${this.lastName}`); // 'this' refers to the document
    // ANY OPERATION: 
    this.firstName = this.firstName.charAt(0).toUpperCase() + this.firstName.slice(1); // Capitalize first letter
    next(); // Call next to proceed with save
});

// THE MIDDLEWARE WILL EXECUTE AFTER THE SAVE OPERATION IS APPLIED ON ANY DOCUMENT WITH THE SCHEMA
peopleSchema.post('save', async function () {
    console.log("USERNAME IS SAVED!!");
});

// Create the model
const People = mongoose.model("People", peopleSchema);

// Create and save a new document
const myName = new People({ firstName: "dev", lastName: "Kanela" });

myName.save()
    .then(() => {
        console.log("Saved Operation Done!");
    })
    .catch((err) => {
        console.log("Save Error:", err);
    });
