const Recipe = require('../models/Recipe')

module.exports = {
    Query: {
        async recipe(_, {ID}){
            return await Recipe.findById(ID)
        },

        async getRecipes(_, {amount}){
            return await Recipe.find().sort({createdAt: -1}).limit(amount)
        }

    },
    Mutation: {
        async createRecipe(_, {recipeInput: {name,lastname,age}}){
            const createdRecipe = new Recipe({
                name: name,
                lastname: lastname,
                age: age,
                createdAt: new Date().toISOString(),
                thumbsUp:0,
                thumbsDown:0
            });

            const res = await createdRecipe.save(); // save at mongo

            console.log(res._doc);

            return {
                id: res.id,
                ...res._doc
            }
        },
        async deleteRecipe(_, {ID}){
           const wasDeleted = (await Recipe.deleteOne({_id: ID})).deletedCount
           return wasDeleted; //1 si elimina o 0 sino
        },
        async editRecipe(_, {ID, recipeInput: {name, lastname}}){
            const wasEdited = (await Recipe.updateOne({_id: ID}, {name:name, lastname: lastname, age: age})).modifiedCount;
            return wasEdited; //1 si ha sido modificado o 0 sino 
        }
    }
}