const { gql } = require('apollo-server')

module.exports = gql `
type Recipe{
    id: ID!
    name: String
    lastname: String
    age: Int
    createdAt: String
    thumbsUp: Int
    thumbsDown: Int
}


type CitaMedica {
    id: ID!
    fecha: String
    motivo: String
    persona: Recipe
}



input RecipeInput{
    name: String
    lastname: String
    age: Int
}


input CitaMedicaInput {
    fecha: String
    motivo: String
    personaId: ID!
}



type Query{
    recipe(ID: ID!): Recipe!
    getRecipes(amount: Int): [Recipe]
    citaMedica(ID: ID!): CitaMedica!
    getCitasMedicas: [CitaMedica]
}


type Mutation {
    createRecipe(recipeInput: RecipeInput): Recipe!
    deleteRecipe(ID: ID!): Boolean
    editRecipe(ID: ID!, recipeInput: RecipeInput): Boolean
    createCitaMedica(citaMedicaInput: CitaMedicaInput): CitaMedica
}
`
