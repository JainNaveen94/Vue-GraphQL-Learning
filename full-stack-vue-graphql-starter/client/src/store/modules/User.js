import router from "../../router";

/** Imports Related to Apollo GraphQL Queries */
import { DefaultClient as apolloClient } from "../../backend-client";

/** Import POST Queries & Mutation */
import { USER_LOGIN, GET_CURRENT_USER, USER_SIGNUP } from "../../api-queries";

/** Vuex Store State which need to be Used or access or modified etc */
let state = {
  currentUser: null,
};

/** Synchronous Setter to set/modify/delete the state or its respective values */
let mutations = {
  SET_CURRENT_USER: (state, payload) => {
    state.currentUser = payload;
  },
  CLEAR_CURRENT_USER: (state) => {
    state.currentUser = null;
  },
};

/** Getter to Get the Values in Components */
let getters = {
  CURRENT_USER: (state) => state.currentUser,
};

/** Action are Asynchronous Methods to asynchronous calls mutations to perform task */
let actions = {
  // User Sign In Action
  signInUser: (context, payload) => {
    // Step 1 : Clear local storage
    localStorage.setItem("token", "");
    // Step 2 : Set some initial states datas
    context.commit("SET_LOADING", true, { root: true });
    context.commit("SET_ERROR", null, { root: true });
    // Step 3 : Perform Action
    apolloClient
      .mutate({
        mutation: USER_LOGIN,
        variables: payload,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.signInUser.token);
        context.commit("SET_ERROR", null, { root: true });
        // Just to Referesh the Page so that Current User is Set
        router.go();
      })
      .catch((err) => {
        context.commit("SET_ERROR", err, { root: true });
      })
      .finally(() => {
        context.commit("SET_LOADING", false, { root: true });
      });
  },
  // User Sign Up Action
  signUpUser: (context, payload) => {
    // Step 1 : Clear local storage
    localStorage.setItem("token", "");
    // Step 2 : Set some initial states datas
    context.commit("SET_LOADING", true, { root: true });
    context.commit("SET_ERROR", null, { root: true });
    // Step 3 : Perform Action
    apolloClient
      .mutate({
        mutation: USER_SIGNUP,
        variables: payload,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.signUpUser.token);
        context.commit("SET_ERROR", null, { root: true });
        // Just Navigate to Home Page
        router.go();
      })
      .catch((err) => {
        context.commit("SET_ERROR", err, { root: true });
      })
      .finally(() => {
        context.commit("SET_LOADING", false, { root: true });
      });
  },
  // User Sign Out Action
  signOutUser: async (context) => {
    // Step 1 : Clear Current User
    context.commit("CLEAR_CURRENT_USER");
    // Step 2 : Clear token from Local Storage
    localStorage.setItem("token", "");
    // Step 3 : End the User Session
    await apolloClient.resetStore();
    // Step 4 : Kickout User from Private Page
    router.push("/").catch(() => {});
  },
  // Fetch Current User Action
  getCurrentUser: (context) => {
    context.commit("SET_ERROR", null, { root: true });
    context.commit("SET_LOADING", true, { root: true });
    apolloClient
      .query({ query: GET_CURRENT_USER })
      .then((res) => {
        context.commit("SET_CURRENT_USER", res.data.getCurrentUser);
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
