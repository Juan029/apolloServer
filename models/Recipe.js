const { model, Schema} = require('mongoose')


const recipeSchema = new Schema({
    name: String,
    lastname: String,
    age: Number,
    createdAt: String,
    thumbsUp: Number,
    thumbsDown: Number
});

module.exports = model('Recipe', recipeSchema);