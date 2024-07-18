const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const MONGODB = "mongodb+srv://ApolloUser:userpassword@apolloserver.nuzu3bn.mongodb.net/?retryWrites=true&w=majority&appName=ApolloServer"
const MONGODB_CITAS = "mongodb+srv://ApolloUser:userpassword@citasmedicas.nuzu3bn.mongodb.net/?retryWrites=true&w=majority&appName=CitasMedicas"


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
        return mongoose.createConnection(MONGODB_CITAS, {useNewUrlParser: true});
    })


    .then((citasConnection) => {
        console.log('Database connection is done');
        global.citasConnection = citasConnection;
        return server.listen({port:5000});
    })



    .then((res) => {
        console.log(`Server running on ${res.url}`)
    });