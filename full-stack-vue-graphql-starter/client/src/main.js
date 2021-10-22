import "@babel/polyfill";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { store } from "./store";
import vuetify from "./plugins/vuetify";

/** Graph QL Related Imoports */
// import ApolloClient from "apollo-boost";
import { DefaultClient as apolloClient } from "./backend-client";
import VueApollo from "vue-apollo";
Vue.use(VueApollo);

/** Define Providers for Vue Apollo */
const apolloProvider = new VueApollo({ apolloClient });

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  apolloProvider: apolloProvider,
  render: (h) => h(App),
  created() {
    // Execute Query to Fetch Current User
    this.$store.dispatch("getCurrentUser");
  },
}).$mount("#app");
