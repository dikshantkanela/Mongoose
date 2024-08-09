const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/productApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("CONNECTION OPEN!!");
})
.catch((err) => {
    console.log("OHH NO ERROR!!!");
    console.log(err);
});

// Define schema
const peopleSchema = new mongoose.Schema({
    firstName: String,
    lastName: String
});

// Define virtual property for full name
peopleSchema.virtual("fullName").get(function() {
    return `${this.firstName} ${this.lastName}`;
});

// Create model
const People = mongoose.model("People", peopleSchema);

// Create an instance and save it to the database
const myName = new People({ firstName: "Mayank", lastName: "Kanela" });
myName.save()
.then(() => {
    console.log("Saved Successfully!");
    console.log("Full Name:", myName.fullName); // Access the virtual property
})
.catch((err) => {
    console.log("Save Error:", err);
});
