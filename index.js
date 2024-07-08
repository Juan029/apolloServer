const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const MONGODB = "mongodb+srv://ApolloUser:userpassword@apolloserver.nuzu3bn.mongodb.net/?retryWrites=true&w=majority&appName=ApolloServer"


//apollosrver
//typedefs
//resolvers


const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const { applyDefaults } = require('./models/Recipe');

const server = new ApolloServer({
    typeDefs,
    resolvers
});


mongoose.connect(MONGODB, {useNewUrlParser: true})
    .then (() => {
        console.log('Mongodb connection is done');
        return server.listen({port:5000});
    })
    .then((res) => {
        console.log(`Server running on ${res.url}`)
    });