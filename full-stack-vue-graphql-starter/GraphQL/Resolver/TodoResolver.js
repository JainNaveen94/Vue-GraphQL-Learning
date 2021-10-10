// import * as TypeDefs from "../TypeDefs/Tod roTypeDef";
import * as Todo from "../../TempData/Todo";

export const resolvers = {
    Query : {
        getAllTodos: () => {
            return Todo.todo;
        },
    }
}