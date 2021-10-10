const {ApolloServer, gql} = require('apollo-server');

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