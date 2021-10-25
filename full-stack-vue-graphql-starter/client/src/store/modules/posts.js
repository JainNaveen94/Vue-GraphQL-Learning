/** Imports Related to Apollo GraphQL Queries */
import { DefaultClient as apolloClient } from "../../backend-client.js";

/** Import POST Queries & Mutation */
import { GET_POST } from "../../api-queries";

/** Vuex Store State which need to be Used or access or modified etc */
let state = {
  posts: [],
};

/** Synchronous Setter to set/modify/delete the state or its respective values */
let mutations = {
  SET_POSTS: (state, payload) => {
    state.posts = payload;
  },
};

/** Getter to Get the Values in Components */
let getters = {
  POSTS: (state) => state.posts,
};

/** Action are Asynchronous Methods to asynchronous calls mutations to perform task */
let actions = {
  getPosts: (context) => {
    context.commit("SET_LOADING", true, { root: true });
    context.commit("SET_ERROR", null, { root: true });
    apolloClient
      .query({ query: GET_POST })
      .then((res) => {
        context.commit("SET_POSTS", res.data.getPosts);
        context.commit("SET_ERROR", null, { root: true });
      })
      .catch((err) => {
        context.commit("SET_ERROR", err, { root: true });
      })
      .finally(() => {
        context.commit("SET_LOADING", false, { root: true });
      });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
