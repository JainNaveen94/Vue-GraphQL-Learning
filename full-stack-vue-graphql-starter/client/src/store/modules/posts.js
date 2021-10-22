/** Imports Related to Apollo GraphQL Queries */
import { defaultClient as apolloClient } from "../../main";

/** Import POST Queries & Mutation */
import { GET_POST } from "../../api-queries";

  /** Vuex Store State which need to be Used or access or modified etc */
  let state = {
    loading: false,
    posts:[],
  };

  /** Synchronous Setter to set/modify/delete the state or its respective values */
  let mutations = {
    SET_POSTS: (state, payload) => {
      state.posts = payload
    },
    SET_LOADING: (state, payload) => {
      state.loading = payload
    }
  };

  /** Getter to Get the Values in Components */
  let getters = {
    POSTS: (state) => state.posts,
    LOADING: state => state.loading
  };

  /** Action are Asynchronous Methods to asynchronous calls mutations to perform task */
  let actions = {
    getPosts: (context) => {
      context.commit("SET_LOADING", true);
      apolloClient
        .query({query: GET_POST})
        .then((res) => {
          context.commit("SET_POSTS", res.data.getPosts);
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
