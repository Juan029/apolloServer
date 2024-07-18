const { gql } = require('apollo-server')

module.exports = gql `
type Recipe{
    name: String
    lastname: String
    age: Int
    createdAt: String
    thumbsUp: Int
    thumbsDown: Int
}

input RecipeInput{
    name: String
    lastname: String
    age: Int
}


type Query{
    recipe(ID: ID!): Recipe!
    getRecipes(amount: Int): [Recipe]
}


type Mutation {
    createRecipe(recipeInput: RecipeInput): Recipe!
    deleteRecipe(ID: ID!): Boolean
    editRecipe(ID: ID!, recipeInput: RecipeInput): Boolean
}
`
