/** Apollo Client Liberary  */
import ApolloClient from "apollo-boost";

/** Default Client Configuration as per your requirement */
const DefaultClient = new ApolloClient({
  uri: "http://localhost:4000/graphql",

  /** Request Header Configuration */
  // Its Force you to include Auth Token with Every Request made to Backend
  fetchOptions: {
    credentials: "include",
  },

  // Its add Token to your Request
  request: (operation) => {
    // if no token with key of 'token' in localStorage, add it
    if (!localStorage.token) {
      localStorage.setItem("token", "");
    }

    // operation adds the token to an authorization header, which is sent to backend
    operation.setContext({
      headers: {
        authorization: localStorage.getItem("token"),
      },
    });
  },

  // It Catch the Different types of error and print on console
  onError: ({ graphQLErrors, networkError }) => {
    if (networkError) {
      console.log("[networkError]", networkError);
    }

    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        console.dir(err);
      }
    }
  },
});

export { DefaultClient };
