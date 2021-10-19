import Vue from "vue";
import Vuex from "vuex";

/** Imports Related to Apollo GraphQL Queries */
import { defaultClient as apolloClient } from "../main";
import { gql } from "apollo-boost";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    posts:[],
  },
  mutations: {
    SET_POSTS: (state, payload) => {
      state.posts = payload
    }
  },
  getters: {
    POSTS: state => state.posts
  },
  actions: {
    getPosts: (context) => {
      apolloClient
        .query({
          query: gql`
            query {
              getPosts {
                _id
                title
                imageUrl
                description
                likes
              }
            }
          `,
        })
        .then((res) => {
          context.commit("SET_POSTS", res.data.getPosts);
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
  modules: {},
});
