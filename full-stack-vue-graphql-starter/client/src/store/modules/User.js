/** Imports Related to Apollo GraphQL Queries */
import { DefaultClient as apolloClient } from "../../backend-client";

/** Import POST Queries & Mutation */
import { USER_LOGIN } from "../../api-queries";

  /** Vuex Store State which need to be Used or access or modified etc */
  let state = {
    loading: false,
  };

  /** Synchronous Setter to set/modify/delete the state or its respective values */
  let mutations = {
    SET_LOADING: (state, payload) => {
      state.loading = payload
    }
  };

  /** Getter to Get the Values in Components */
  let getters = {
    LOADING: state => state.loading
  };

  /** Action are Asynchronous Methods to asynchronous calls mutations to perform task */
  let actions = {
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
  };

  export default {
      state,
      getters,
      mutations,
      actions
  }
