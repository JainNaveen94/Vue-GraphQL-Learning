/** Imports Related to Apollo GraphQL Queries */
import { DefaultClient as apolloClient } from "../../backend-client";

/** Import POST Queries & Mutation */
import { USER_LOGIN, GET_CURRENT_USER } from "../../api-queries";

  /** Vuex Store State which need to be Used or access or modified etc */
  let state = {
    loading: false,
    currentUser: {},
  };

  /** Synchronous Setter to set/modify/delete the state or its respective values */
  let mutations = {
    SET_LOADING: (state, payload) => {
      state.loading = payload
    },
    SET_CURRENT_USER: (state, payload) => {
      state.currentUser = payload
    }
  };

  /** Getter to Get the Values in Components */
  let getters = {
    LOADING: state => state.loading,
    CURRENT_USER: state => state.currentUser
  };

  /** Action are Asynchronous Methods to asynchronous calls mutations to perform task */
  let actions = {
    // User Sign Action
    signInUser: (context, payload) => {
      context.commit("SET_LOADING", true);
      apolloClient
        .mutate({
            mutation: USER_LOGIN,
            variables: payload
        })
        .then((res) => {
            localStorage.setItem('token', res.data.signInUser.token);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          context.commit("SET_LOADING", false);
        });
    },
    // Fetch Current User Action
    getCurrentUser: (context) => {
      context.commit("SET_LOADING", true);
      apolloClient.query({query: GET_CURRENT_USER})
      .then((res) => {
        context.commit("SET_CURRENT_USER", res.data.getCurrentUser)
      })
      .catch((err)=> {
        console.error(err);
      })
      .finally(() => {
        context.commit("SET_LOADING", false);
      })
    }
  };

  export default {
      state,
      getters,
      mutations,
      actions
  }
