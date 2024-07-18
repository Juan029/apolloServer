const Recipe = require('../models/Recipe')
const CitaMedica = require('../models/CitaMedica')

module.exports = {
    Query: {
        async recipe(_, {ID}){
            return await Recipe.findById(ID)
        },
        async getRecipes(_, {amount}){
            return await Recipe.find().sort({createdAt: -1}).limit(amount)
        },
        async citaMedica(_, {ID}){
            return await CitaMedica.findById(ID)
        },
        async getCitasMedicas(_, { personaId }) {
            if (personaId) {
              return await CitaMedica.find({ personaId });
            }
            return await CitaMedica.find();
          }
    },
    Mutation: {
        async createRecipe(_, {recipeInput: {name, lastname, age}}){
            const createdRecipe = new Recipe({
                name,
                lastname,
                age,
                createdAt: new Date().toISOString(),
                thumbsUp: 0,
                thumbsDown: 0
            });

            const res = await createdRecipe.save();
            console.log(res._doc);

            return {
                id: res.id,
                ...res._doc
            }
        },
        async deleteRecipe(_, {ID}){
           const wasDeleted = (await Recipe.deleteOne({_id: ID})).deletedCount
           return wasDeleted; // 1 si elimina o 0 sino
        },
        async editRecipe(_, {ID, recipeInput: {name, lastname, age}}){
            const wasEdited = (await Recipe.updateOne({_id: ID}, {name, lastname, age})).modifiedCount;
            return wasEdited; // 1 si ha sido modificado o 0 sino 
        },
        async createCitaMedica(_, {citaMedicaInput: {fecha, motivo, personaId}}) {
            const createdCitaMedica = new CitaMedica({
                fecha,
                motivo,
                personaId
            });

            const res = await createdCitaMedica.save();

            return {
                id: res.id,
                ...res._doc
            }
        }
    },
    CitaMedica: {
        async persona(citaMedica) {
            return await Recipe.findById(citaMedica.personaId)
        }
    }
}