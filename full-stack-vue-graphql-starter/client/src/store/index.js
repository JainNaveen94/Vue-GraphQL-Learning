import Vue from "vue";
import Vuex from "vuex";

// /** Imports Related to Apollo GraphQL Queries */
// import { defaultClient as apolloClient } from "../main";
// import { gql } from "apollo-boost";

/** Import the other mini-stores */
import posts from './modules/posts';
import user from './modules/User';

Vue.use(Vuex);

export const store = new Vuex.Store({
  /** Vuex Store State which need to be Used or access or modified etc */
  state: {
    loading: false,
    error: null,
    authError: null
  },
  /** Synchronous Setter to set/modify/delete the state or its respective values */
  mutations: {
    SET_LOADING: (state, payload) => {
      state.loading = payload
    },
    SET_ERROR: (state, payload) => {
      state.error = payload
    },
    SET_AUTH_ERROR: (state, payload) => {
      state.authError = payload
    }
  },
  /** Getter to Get the Values in Components */
  getters: {
    LOADING: state => state.loading,
    ERROR: state => state.error,
    AUTH_ERROR: state => state.authError
  },
  /** Action are Asynchronous Methods to asynchronous calls mutations to perform task */
  actions: {
    setAuthenticationError: (context, payload) => {
      context.commit('SET_AUTH_ERROR', payload);
    }
  },
  /** Modules are used to specify the smaller or mini stores */
  modules: {
    posts,
    user
  },
});
