/** Import Apollo Server and Moongose Library */
const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

/** Import MongoDB Schemas for mlabs moongose DB Server */
const User = require('./Models/User');
const Post = require('./Models/Post');

/** Import Relevent Package to Read the GraphQL Files */
const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, './GraphQL/TypeDefs/typeDefs.gql');

/** GraphQL Configuration of Typedefs & Resolver */
const typeDefs = fs.readFileSync(filePath, 'utf-8');
const resolvers = require('./GraphQL/Resolver/resolver');

/** Just to Read Environment Variable file Having Mongo DB URI Entry */
require('dotenv').config({path: 'variable.env'})

/** Mongo DB Data Base Configuration */
mongoose
.connect(process.env.MONGO_URI, {useUnifiedTopology: true}, { useNewUrlParser: true })
.then(()=> {
    console.log("Database Connected Successfully");
})
.catch(err => {
    console.error("Database Not Connected because of " + err);
})

/** Apollo/GraphQL Server Initialization using typeDefs, resolvers and context */
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: {
        User,
        Post
    }
});

/** Server Listing Configuration */
server.listen().then(({url}) => {
    console.log("Server Listen on the Address : " + url);
});