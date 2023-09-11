const mongoose = require("mongoose")

//schema for fruit entry/display
const fruitSchema = new mongoose.Schema({
    //brackets are used to add descriptors and requirements to the items in the schema, basically options
    name: { type: String, required: true },
    color: { type: String, required: true},
    readyToEat: Boolean,
    //If you say this is false, SOMETHING has to be displayed anyway in the checks for the
    img: String
}, /*this is the options object*/ {
    //timestamp will show when it was created, and last updated
    timestamps: true,
})

//model for fruit that uses the fruitSchema, this allows us to manipulate items in MongoDB.
const Fruit = mongoose.model("Fruit", fruitSchema)

//exporting this to other files to interact with DB
module.exports = Fruit