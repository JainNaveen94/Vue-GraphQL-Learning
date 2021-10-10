const {ApolloServer, gql} = require('apollo-server');
const mongoose = require('mongoose');

/** Just to Read Environment Variable file Having Mongo DB URI Entry */
require('dotenv').config({path: 'variable.env'})

/** Mongo DB Data Base Configuration */
mongoose
.connect(process.env.MONGO_URI, {useUnifiedTopology: true})
.then(()=> {
    console.log("Database Connected Successfully");
})
.catch(err => {
    console.error("Database Not Connected because of " + err);
})

/** Data To Be Used To Perform Queries */
const todo = [
    {task: "Learning GraphQL", completed: false},
    {task: "Learning Typescript", completed: true},
    {task: "Learning Jest", completed: false}
];

/** GraphQL Typedefs */
const typeDefs = gql`

type Todo {
        task: String,
        completed: Boolean
    }

    type Query {
        getAllTodos: [Todo]
    }

    type Mutation {
        addTodo(task: String, completed: Boolean): Todo
    }
`;

/** GraphQL Resolvers */
const resolvers = {
    Query : {
        getAllTodos: () => {
            return todo;
        },
    },
    Mutation : {
        addTodo: (_, {task, completed}) => {
            const newTodo = {task, completed};
            todo.push(newTodo);
            return newTodo;
        }
    }
};

/** Apollo Server Initialization */
const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.listen().then(({url}) => {
    console.log("Server Listen on the Address : " + url);
});