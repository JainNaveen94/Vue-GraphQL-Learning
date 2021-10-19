import Vue from "vue";
import Vuex from "vuex";

// /** Imports Related to Apollo GraphQL Queries */
// import { defaultClient as apolloClient } from "../main";
// import { gql } from "apollo-boost";

/** Import the other mini-stores */
import posts from './modules/posts';

Vue.use(Vuex);

export const store = new Vuex.Store({
  /** Vuex Store State which need to be Used or access or modified etc */
  state: {},
  /** Synchronous Setter to set/modify/delete the state or its respective values */
  mutations: {},
  /** Getter to Get the Values in Components */
  getters: {},
  /** Action are Asynchronous Methods to asynchronous calls mutations to perform task */
  actions: {},
  /** Modules are used to specify the smaller or mini stores */
  modules: {
    posts
  },
});
