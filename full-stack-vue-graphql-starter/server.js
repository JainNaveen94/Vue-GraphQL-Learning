const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

/** MongoDB Schemas */
const User = require('./Models/User');
const Post = require('./Models/Post');

/** Other Required Packages for File & Directory Stuff */
const fs = require('fs');
const path = require('path');

/** GraphQL Configuration of Typedefs */
const filePath = path.join(__dirname, 'typeDefs.gql');
const typeDefs = fs.readFileSync(filePath, 'utf-8');
const resolvers = require('./resolver');

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

/** Apollo Server Initialization */
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: {
        User,
        Post
    }
});

server.listen().then(({url}) => {
    console.log("Server Listen on the Address : " + url);
});