let mongoose = require('mongoose');

//Creating the model

let recipeSchema = mongoose.Schema(
    {
    title: { type: String, required: true, trim: true },
    ingredients: { type: String, required: true },
    steps: { type: String, required: true },
    tags: { type: [String], default: [] }
    },
    {
        //Using timestamps so mongo will auto create collection, and timestamp it
        collection: "recipes",
        timestamps: true
    }
);

//Export
module.exports = mongoose.model('Recipe', recipeSchema)