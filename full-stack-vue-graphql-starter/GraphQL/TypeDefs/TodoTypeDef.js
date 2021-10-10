export const typedef = gql`

    type Todo {
        task: String,
        completed: Boolean
    }

    type Query {
        getAllTodos: [Todo]
    }

`;